import { useEffect, useState } from 'react'
import {
  onboardStops,
  optionBStops,
  replacementOnboardStops,
  transferOnboardStops,
  type OnboardBus,
  type RouteChoice,
  type Screen,
} from './data'
import { useBusSimulation } from './useBusSimulation'
import { useDelayedFlag } from './useDelayedFlag'

export function useJourneyState() {
  // navigation
  const [screen, setScreen] = useState<Screen>('plan')
  const [screenHistory, setScreenHistory] = useState<Screen[]>([])

  // trip
  const [startLocation, setStartLocation] = useState('Maple Gate')
  const [destination, setDestination] = useState('Campus West')
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
  const activeTransferStops = replacementRoute ? replacementOnboardStops : transferOnboardStops
  const activeTransferBus = replacementRoute ? 'AV36' : 'AV12'
  const activeFirstStops = routeChoice === 'B' ? optionBStops : onboardStops
  const activeFirstBus = routeChoice === 'B' ? 'AV22' : 'AV84'

  // bus simulations + delayed modals
  const first = useBusSimulation(activeFirstStops.length)
  const transfer = useBusSimulation(activeTransferStops.length)
  const transferModalReady = useDelayedFlag(routeChoice === 'A' && first.stopIndex === onboardStops.length - 1)
  const destinationModalReady = useDelayedFlag(transfer.stopIndex === activeTransferStops.length - 1)

  // navigation helpers
  const go = (next: Screen) => {
    if (next !== screen) setScreenHistory((history) => [...history, screen])
    setScreen(next)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }
  const back = () => {
    setScreenHistory((history) => {
      if (history.length === 0) return history
      setScreen(history[history.length - 1])
      return history.slice(0, -1)
    })
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

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
    if (routeChoice === 'B' && screen === 'journey' && first.stopIndex >= 1) {
      first.setMoving(false)
      setScreenHistory((history) => [...history, 'journey'])
      setScreen('disruption')
    }
  }, [first.stopIndex, first.setMoving, routeChoice, screen])

  return {
    // navigation
    screen,
    canGoBack: screenHistory.length > 0,
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
