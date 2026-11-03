import { useEffect, useState } from 'react'
import {
  onboardStops,
  optionBStops,
  replacementOnboardStops,
  transferOnboardStops,
  type OnboardBus,
  type RouteChoice,
  type Screen,
  type Stop,
} from './data'
import { useBusSimulation } from './useBusSimulation'
import { useDelayedFlag } from './useDelayedFlag'

function withName(stops: Stop[], index: number, name: string): Stop[] {
  const target = index < 0 ? stops.length + index : index
  const label = name.trim()
  if (!label) return stops
  return stops.map((stop, i) => (i === target ? { ...stop, name: label } : stop))
}

export function useJourneyState() {
  // navigation
  const [screen, setScreen] = useState<Screen>('plan')
  // the step of the trip the user is on; Help and Settings are opened "on top" of it
  const [tripScreen, setTripScreen] = useState<Screen>('plan')

  // trip
  const [startLocation, setStartLocation] = useState('')
  const [destination, setDestination] = useState('')
  const [routeChoice, setRouteChoice] = useState<RouteChoice>('A')
  const [replacementRoute, setReplacementRoute] = useState(false)
  const [onboardBus, setOnboardBus] = useState<OnboardBus>(null)
  const [helpSent, setHelpSent] = useState(false)
  const [rating, setRating] = useState(0)
  const [transferAlertDismissed, setTransferAlertDismissed] = useState(false)
  const [destinationAlertDismissed, setDestinationAlertDismissed] = useState(false)

  // settings
  const [darkMode, setDarkMode] = useState(false)
  const [largeText, setLargeText] = useState(false)
  const [journeyAlerts, setJourneyAlerts] = useState(true)

  // derived
  const activeTransferStops = withName(replacementRoute ? replacementOnboardStops : transferOnboardStops, -1, destination)
  const activeTransferBus = replacementRoute ? 'AV36' : 'AV12'
  const activeFirstStops = withName(routeChoice === 'B' ? optionBStops : onboardStops, 0, startLocation)
  const activeFirstBus = routeChoice === 'B' ? 'AV22' : 'AV84'

  // bus simulations + delayed modals
  const first = useBusSimulation(activeFirstStops.length)
  const transfer = useBusSimulation(activeTransferStops.length)
  const transferModalReady = useDelayedFlag(routeChoice === 'A' && first.stopIndex === onboardStops.length - 1)
  const destinationModalReady = useDelayedFlag(transfer.stopIndex === activeTransferStops.length - 1)

  // navigation helpers
  // Back follows the steps of the trip, not every screen ever opened.
  // Once you are on a bus, Back is hidden: you can't "un-board" a bus.
  const parentOf = (s: Screen): Screen | null => {
    switch (s) {
      case 'routes': return 'plan'
      case 'tracking': return 'routes'
      case 'boarding': return 'tracking'
      case 'recovery': return 'disruption'
      case 'transfer': return replacementRoute ? 'recovery' : null
      case 'transferBoarding': return 'transfer'
      default: return null
    }
  }
  const isTab = (s: Screen) => s === 'help' || s === 'settings'

  const go = (next: Screen) => {
    if (!isTab(next)) setTripScreen(next)
    setScreen(next)
  }
  const back = () => {
    if (isTab(screen)) return setScreen(tripScreen) // close Help / Settings
    const parent = parentOf(screen)
    if (parent) go(parent)
  }
  const backTarget = isTab(screen) ? tripScreen : parentOf(screen)

  // flow actions (each one used to be an inline handler inside page.tsx)
  const selectRoute = (choice: RouteChoice) => {
    setRouteChoice(choice)
    first.setStopIndex(0)
    go('tracking')
  }
  const confirmFirstBoarding = () => {
    setOnboardBus('first')
    go('journey')
  }
  const goToReplacementRoute = () => {
    setHelpSent(false)
    setOnboardBus(null)
    go('recovery')
  }
  const trackTransferBus = () => {
    setHelpSent(false)
    setOnboardBus(null)
    setReplacementRoute(false)
    transfer.setStopIndex(0)
    go('transfer')
  }
  const startReplacementTransfer = () => {
    setReplacementRoute(true)
    transfer.setStopIndex(0)
    go('transfer')
  }
  const confirmTransferBoarding = () => {
    setHelpSent(false)
    setOnboardBus('transfer')
    go('arrival')
  }
  const finishJourney = () => {
    setHelpSent(false)
    setOnboardBus(null)
    go('feedback')
  }
  const resetTrip = () => {
    setRating(0)
    setHelpSent(false)
    setOnboardBus(null)
    first.setStopIndex(0)
    transfer.setStopIndex(0)
    setTransferAlertDismissed(false)
    setDestinationAlertDismissed(false)
    setReplacementRoute(false)
    go('plan')
  }

  // effects
  useEffect(() => {
    document.documentElement.classList.toggle('large-text-enabled', largeText)
    return () => document.documentElement.classList.remove('large-text-enabled')
  }, [largeText])

  // route B: bus breaks down after the second stop
  useEffect(() => {
    if (routeChoice === 'B' && tripScreen === 'journey' && first.stopIndex >= 1) {
      first.setMoving(false)
      setTripScreen('disruption')
      if (screen === 'journey') setScreen('disruption')
    }
  }, [first.stopIndex, first.setMoving, routeChoice, screen, tripScreen])

  return {
    // navigation
    screen,
    tripScreen,
    backTarget,
    canGoBack: backTarget !== null,
    go,
    back,
    // trip
    startLocation,
    setStartLocation,
    destination,
    setDestination,
    routeChoice,
    replacementRoute,
    onboardBus,
    helpSent,
    setHelpSent,
    rating,
    setRating,
    transferAlertDismissed,
    setTransferAlertDismissed,
    destinationAlertDismissed,
    setDestinationAlertDismissed,
    // settings
    darkMode,
    setDarkMode,
    largeText,
    setLargeText,
    journeyAlerts,
    setJourneyAlerts,
    // derived
    activeFirstStops,
    activeFirstBus,
    activeTransferStops,
    activeTransferBus,
    // simulations
    first,
    transfer,
    transferModalReady,
    destinationModalReady,
    // actions
    selectRoute,
    confirmFirstBoarding,
    goToReplacementRoute,
    trackTransferBus,
    startReplacementTransfer,
    confirmTransferBoarding,
    finishJourney,
    resetTrip,
  }
}

export type Journey = ReturnType<typeof useJourneyState>