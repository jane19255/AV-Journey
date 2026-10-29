"use client";

import { useEffect, useState, type ReactNode } from 'react'

type Screen =
  | 'plan'
  | 'routes'
  | 'tracking'
  | 'boarding'
  | 'journey'
  | 'disruption'
  | 'help'
  | 'recovery'
  | 'transfer'
  | 'transferBoarding'
  | 'arrival'
  | 'feedback'
  | 'done'
  | 'settings'

const screens: { id: Screen; label: string; group: string }[] = [
  { id: 'plan', label: 'Plan trip', group: 'Planning' },
  { id: 'routes', label: 'Choose route', group: 'Planning' },
  { id: 'tracking', label: 'Track AV84', group: 'First bus' },
  { id: 'boarding', label: 'Confirm boarding', group: 'First bus' },
  { id: 'journey', label: 'Live journey', group: 'First bus' },
  { id: 'disruption', label: 'Unexpected stop', group: 'Recovery' },
  { id: 'help', label: 'Get assistance', group: 'Recovery' },
  { id: 'recovery', label: 'Walking transfer', group: 'Recovery' },
  { id: 'transfer', label: 'Track AV12', group: 'Transfer' },
  { id: 'transferBoarding', label: 'Board AV12', group: 'Transfer' },
  { id: 'arrival', label: 'Arrive', group: 'Destination' },
  { id: 'feedback', label: 'Rate journey', group: 'Destination' },
  { id: 'done', label: 'Trip summary', group: 'Destination' },
  { id: 'settings', label: 'Settings', group: 'Preferences' },
]

function Icon({ name, size = 24 }: { name: string; size?: number }) {
  const paths: Record<string, ReactNode> = {
    back: <path d="m15 18-6-6 6-6" />,
    bus: <><rect x="5" y="3" width="14" height="15" rx="3" /><path d="M5 11h14M8 7h.01M16 7h.01M8 18v3M16 18v3M8 15h.01M16 15h.01" /></>,
    clock: <><circle cx="12" cy="12" r="9" /><path d="M12 7v5l3 2" /></>,
    help: <><circle cx="12" cy="12" r="9" /><path d="M9.5 9a2.5 2.5 0 1 1 3.5 2.3c-.8.4-1 1-1 1.7M12 17h.01" /></>,
    home: <><path d="m3 11 9-8 9 8" /><path d="M5 10v10h14V10M9 20v-6h6v6" /></>,
    location: <><path d="M20 10c0 5-8 11-8 11S4 15 4 10a8 8 0 1 1 16 0Z" /><circle cx="12" cy="10" r="2.5" /></>,
    map: <><path d="m3 6 6-3 6 3 6-3v15l-6 3-6-3-6 3V6Z" /><path d="M9 3v15M15 6v15" /></>,
    phone: <path d="M7 3h3l2 4-2 2a14 14 0 0 0 5 5l2-2 4 2v3c0 2-2 4-4 4A14 14 0 0 1 3 7c0-2 2-4 4-4Z" />,
    route: <><circle cx="6" cy="5" r="2" /><circle cx="18" cy="19" r="2" /><path d="M6 7v3c0 2 2 3 4 3h4c2 0 4 1 4 4" /></>,
    settings: <><circle cx="12" cy="12" r="3" /><path d="M19 13.5v-3l-2-.7-.7-1.7.9-1.9-2.1-2.1-1.9.9-1.7-.7L10.5 2h-3l-.7 2.3-1.7.7-1.9-.9-2.1 2.1.9 1.9-.7 1.7-2 .7v3l2 .7.7 1.7-.9 1.9 2.1 2.1 1.9-.9 1.7.7.7 2.3h3l.7-2.3 1.7-.7 1.9.9 2.1-2.1-.9-1.9.7-1.7 2-.7Z" transform="translate(1.5) scale(.88)" /></>,
    walk: <><circle cx="13" cy="4" r="2" /><path d="m10 21 2-7-3-3 3-3 3 2 3 1M14 14l3 3v4M8 14l-3 5" /></>,
    warning: <><path d="M12 3 2.8 20h18.4L12 3Z" /><path d="M12 9v4M12 17h.01" /></>,
    check: <path d="m5 12 4 4L19 6" />,
    swap: <path d="M7 7h12l-3-3M17 17H5l3 3" />,
  }
  return <svg aria-hidden="true" fill="none" height={size} viewBox="0 0 24 24" width={size} stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2">{paths[name]}</svg>
}

function Button({ children, onClick, secondary = false, disabled = false }: { children: ReactNode; onClick?: () => void; secondary?: boolean; disabled?: boolean }) {
  return <button className={secondary ? 'btn secondary' : 'btn'} type="button" onClick={onClick} disabled={disabled}>{children}</button>
}

function MapPreview({ walking = false }: { walking?: boolean }) {
  return (
    <div className="mini-map" role="img" aria-label={walking ? 'Walking route to Pine Street bus stop' : 'Live bus route map'}>
      <span className="map-road one">Campus Road</span><span className="map-road two">Pine Street</span>
      <svg viewBox="0 0 500 260" aria-hidden="true"><path d="M45 215 C110 185 115 120 190 130 S290 180 330 105 S405 55 460 48" /></svg>
      <span className="map-point start"><Icon name={walking ? 'walk' : 'location'} size={18} /></span>
      <span className="map-point finish"><Icon name="bus" size={18} /></span>
      <span className="map-time">{walking ? '4 min walk' : 'AV84 · 2 min'}</span>
    </div>
  )
}

function StopTimeline({ transfer = false }: { transfer?: boolean }) {
  const stops = transfer ? ['Pine Street', 'Library Walk', 'Campus West'] : ['Maple Gate', 'North Park', 'Pine Street']
  return <ol className="timeline">{stops.map((stop, i) => <li className={i === 0 ? 'passed' : i === 1 ? 'current' : ''} key={stop}><span>{i === 0 ? '✓' : i + 1}</span><div><strong>{stop}</strong><small>{i === 1 ? 'Next stop' : i === 2 ? (transfer ? 'Destination' : 'Transfer here') : 'Departed'}</small></div></li>)}</ol>
}

const onboardStops = [
  { name: 'Maple Gate', note: 'Boarded', left: 8, top: 76 },
  { name: 'North Park', note: '2 min', left: 31, top: 52 },
  { name: 'Lake Junction', note: '4 min', left: 58, top: 58 },
  { name: 'Pine Street', note: 'Change to AV12', left: 84, top: 19 },
]

const optionBStops = [
  { name: 'Maple Gate', note: 'Boarded', left: 8, top: 76 },
  { name: 'Garden Link', note: 'Service interrupted', left: 42, top: 49 },
  { name: 'North Park', note: 'Transfer', left: 84, top: 19 },
]

const transferOnboardStops = [
  { name: 'Pine Street', note: 'Boarded', left: 8, top: 76 },
  { name: 'Library Walk', note: '3 min', left: 47, top: 48 },
  { name: 'Campus West', note: 'Final stop', left: 84, top: 19 },
]

const replacementOnboardStops = [
  { name: 'North Park', note: 'Boarded', left: 8, top: 76 },
  { name: 'Hill View', note: '3 min', left: 33, top: 51 },
  { name: 'Campus Library', note: '5 min', left: 61, top: 57 },
  { name: 'Campus West', note: 'Final stop', left: 84, top: 19 },
]

function OnboardMap({
  stopIndex,
  moving,
  stops,
}: {
  stopIndex: number
  moving: boolean
  stops: typeof onboardStops
}) {
  return (
    <div className="onboard-map" aria-label={`Live route map. ${stops[stopIndex].name} ${stopIndex === stops.length - 1 ? 'reached' : 'is the latest stop'}`}>
      <span className="map-road one">Campus Road</span>
      <span className="map-road two">Pine Street</span>
      <svg viewBox="0 0 500 260" aria-hidden="true">
        <path className="route-base" d="M45 215 C110 185 115 120 190 130 S290 180 330 105 S405 55 460 48" />
        <path className="route-done" pathLength="100" d="M45 215 C110 185 115 120 190 130 S290 180 330 105 S405 55 460 48" style={{ strokeDashoffset: 100 - (stopIndex / (stops.length - 1)) * 100 }} />
      </svg>
      {stops.map((stop, index) => (
        <div
          className={`route-stop ${index < stopIndex ? 'reached' : index === stopIndex ? 'current' : ''}`}
          key={stop.name}
          style={{ left: `${stop.left}%`, top: `${stop.top}%` }}
        >
          <span>{index < stopIndex ? '✓' : index + 1}</span>
          <strong>{stop.name}</strong>
        </div>
      ))}
      <div
        className={`moving-bus ${moving ? 'is-moving' : ''}`}
        style={{ left: `${stops[stopIndex].left}%`, top: `${stops[stopIndex].top}%` }}
      >
        <Icon name="bus" size={18} />
      </div>
      <div className="live-badge"><i /> Live location</div>
    </div>
  )
}

export default function App() {
  const [screen, setScreen] = useState<Screen>('plan')
  const [screenHistory, setScreenHistory] = useState<Screen[]>([])
  const [startLocation, setStartLocation] = useState('Maple Gate')
  const [destination, setDestination] = useState('Campus West')
  const [helpSent, setHelpSent] = useState(false)
  const [onboardBus, setOnboardBus] = useState<'first' | 'transfer' | null>(null)
  const [rating, setRating] = useState(0)
  const [onboardStop, setOnboardStop] = useState(0)
  const [busMoving, setBusMoving] = useState(false)
  const [transferStop, setTransferStop] = useState(0)
  const [transferBusMoving, setTransferBusMoving] = useState(false)
  const [transferAlertDismissed, setTransferAlertDismissed] = useState(false)
  const [destinationAlertDismissed, setDestinationAlertDismissed] = useState(false)
  const [transferModalReady, setTransferModalReady] = useState(false)
  const [destinationModalReady, setDestinationModalReady] = useState(false)
  const [replacementRoute, setReplacementRoute] = useState(false)
  const [routeChoice, setRouteChoice] = useState<'A' | 'B'>('A')
  const [darkMode, setDarkMode] = useState(false)
  const [largeText, setLargeText] = useState(false)
  const [journeyAlerts, setJourneyAlerts] = useState(true)
  const activeTransferStops = replacementRoute ? replacementOnboardStops : transferOnboardStops
  const activeTransferBus = replacementRoute ? 'AV36' : 'AV12'
  const activeFirstStops = routeChoice === 'B' ? optionBStops : onboardStops
  const activeFirstBus = routeChoice === 'B' ? 'AV22' : 'AV84'
  const current = screens.findIndex((item) => item.id === screen)
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

  useEffect(() => {
    document.documentElement.classList.toggle('large-text-enabled', largeText)
    return () => document.documentElement.classList.remove('large-text-enabled')
  }, [largeText])

  useEffect(() => {
    if (!busMoving || onboardStop === activeFirstStops.length - 1) {
      if (onboardStop === activeFirstStops.length - 1) setBusMoving(false)
      return
    }
    const timer = window.setTimeout(() => setOnboardStop((stop) => Math.min(stop + 1, activeFirstStops.length - 1)), 1800)
    return () => window.clearTimeout(timer)
  }, [busMoving, onboardStop, activeFirstStops.length])

  useEffect(() => {
    if (routeChoice === 'B' && screen === 'journey' && onboardStop >= 1) {
      setBusMoving(false)
      setScreenHistory((history) => [...history, 'journey'])
      setScreen('disruption')
    }
  }, [onboardStop, routeChoice, screen])

  useEffect(() => {
    if (routeChoice !== 'A' || onboardStop !== onboardStops.length - 1) {
      setTransferModalReady(false)
      return
    }
    const timer = window.setTimeout(() => setTransferModalReady(true), 1500)
    return () => window.clearTimeout(timer)
  }, [onboardStop, routeChoice])

  useEffect(() => {
    if (!transferBusMoving || transferStop === activeTransferStops.length - 1) {
      if (transferStop === activeTransferStops.length - 1) setTransferBusMoving(false)
      return
    }
    const timer = window.setTimeout(() => setTransferStop((stop) => Math.min(stop + 1, activeTransferStops.length - 1)), 1800)
    return () => window.clearTimeout(timer)
  }, [transferBusMoving, transferStop, activeTransferStops.length])

  useEffect(() => {
    if (transferStop !== activeTransferStops.length - 1) {
      setDestinationModalReady(false)
      return
    }
    const timer = window.setTimeout(() => setDestinationModalReady(true), 1500)
    return () => window.clearTimeout(timer)
  }, [transferStop, activeTransferStops.length])

  const content: Record<Screen, ReactNode> = {
    plan: <>
      <Header kicker="Journey planner" title="Plan your journey" subtitle="Choose your start and destination." />
      <div className="location-fields">
        <label><span>From</span><div><Icon name="location" size={20} /><input value={startLocation} onChange={(event) => setStartLocation(event.target.value)} aria-label="Starting location" /></div></label>
        <button className="swap" type="button" aria-label="Swap locations" onClick={() => { setStartLocation(destination); setDestination(startLocation) }}><Icon name="swap" size={20} /></button>
        <label><span>To</span><div><Icon name="location" size={20} /><input value={destination} onChange={(event) => setDestination(event.target.value)} aria-label="Destination" /></div></label>
      </div>
      <div className="quick-row"><button><Icon name="location" size={19} /> Current location</button><button><Icon name="home" size={19} /> Saved places</button></div>
      <Button onClick={() => go('routes')}>Find routes</Button>
      <section className="home-updates" aria-label="Journey updates">
        <div className="service-ok"><span><Icon name="check" size={18} /></span><div><strong>AV network is running normally</strong><small>All campus routes available</small></div></div>
        <button className="recent-trip" onClick={() => go('routes')}><span>Recent journey</span><strong>Maple Gate → Campus West</strong><small>28 min · 1 transfer</small></button>
      </section>
    </>,
    routes: <>
      <Header kicker="2 routes found" title="Choose your route" subtitle="Both routes are step-free." />
      <button className="route-card recommended" onClick={() => { setRouteChoice('A'); setOnboardStop(0); go('tracking') }}>
        <span className="tag">Suggested · fastest</span><div className="route-top"><strong>28 min</strong><span>Arrive 9:10</span></div>
        <div className="bus-line"><b>AV84</b><span /><b>AV12</b></div><p>1 same-stop transfer · 2 min wait</p>
      </button>
      <button className="route-card" onClick={() => { setRouteChoice('B'); setOnboardStop(0); go('tracking') }}>
        <div className="route-top"><strong>35 min</strong><span>Arrive 9:17</span></div>
        <div className="bus-line alt"><b>AV22</b><span /><b>AV07</b></div><p>1 transfer · 6 min wait</p>
      </button>
    </>,
    tracking: <>
      <Header kicker={`${activeFirstBus} · towards North Park`} title="Your bus is 2 min away" subtitle="Wait at Maple Gate, Bay 2." />
      <MapPreview />
      <div className="info-strip"><Icon name="clock" /><div><strong>Arrives 8:42</strong><span>Updated just now</span></div></div>
      <Button onClick={() => go('boarding')}>I see {activeFirstBus}</Button>
    </>,
    boarding: <>
      <div className="hero-icon"><Icon name="bus" size={38} /></div>
      <Header kicker="Check before boarding" title="Is this your bus?" subtitle="Confirm the number and direction shown on the bus." />
      <div className="bus-ticket"><span>Autonomous bus</span><strong>{activeFirstBus}</strong><p>towards North Park</p></div>
      <Button onClick={() => { setOnboardBus('first'); go('journey') }}><Icon name="check" size={21} /> Yes, I’m onboard</Button>
      <Button secondary onClick={() => go('tracking')}>Not this bus</Button>
    </>,
    journey: <>
      <Header
        kicker={`Onboard ${activeFirstBus} · ${onboardStop + 1} of ${activeFirstStops.length} stops`}
        title={onboardStop === activeFirstStops.length - 1 ? 'Transfer stop reached' : `Next: ${activeFirstStops[onboardStop + 1]?.name}`}
        subtitle={onboardStop === activeFirstStops.length - 1 ? `Leave ${activeFirstBus} here, then continue to Campus West.` : `${activeFirstStops.length - onboardStop - 1} stops remaining.`}
      />
      <OnboardMap stopIndex={onboardStop} moving={busMoving} stops={activeFirstStops} />
      <div className="stop-status" role="status" aria-live="polite">
        <span className={onboardStop === activeFirstStops.length - 1 ? 'arrived' : ''}>
          {onboardStop === activeFirstStops.length - 1 ? <Icon name="check" /> : <Icon name="bus" />}
        </span>
        <div>
          <small>{onboardStop === activeFirstStops.length - 1 ? 'Reached transfer stop' : 'Current stop'}</small>
          <strong>{activeFirstStops[onboardStop].name}</strong>
        </div>
        <b>{activeFirstStops[onboardStop].note}</b>
      </div>
      <ol className="compact-stops" aria-label="Bus stop progress">
        {activeFirstStops.map((stop, index) => (
          <li key={stop.name} className={index < onboardStop ? 'reached' : index === onboardStop ? 'current' : ''}>
            <span>{index < onboardStop ? '✓' : index + 1}</span>
            <strong>{stop.name}</strong>
            <small>{index < onboardStop ? 'Passed' : index === onboardStop ? 'You are here' : stop.note}</small>
          </li>
        ))}
      </ol>
      {onboardStop < activeFirstStops.length - 1 ? (
        <Button onClick={() => setBusMoving(!busMoving)}>
          <Icon name={busMoving ? 'clock' : 'bus'} size={21} />
          {busMoving ? 'Pause live journey' : onboardStop > 0 ? 'Continue live journey' : 'Start live journey'}
        </Button>
      ) : (
        <Button onClick={() => { setHelpSent(false); setOnboardBus(null); setReplacementRoute(false); setTransferStop(0); go('transfer') }}><Icon name="bus" size={21} /> Track transfer bus AV12</Button>
      )}
      <Button secondary onClick={() => go('help')}>Get help</Button>
    </>,
    disruption: <>
      <div className="hero-icon alert"><Icon name="warning" size={36} /></div>
      <Header kicker="Service disruption" title={`${activeFirstBus} cannot continue`} subtitle="A sensor fault is being checked. The bus is safely stopped at Garden Link." />
      <div className="status-grid"><div><span>Expected delay</span><strong>15–20 min</strong></div><div><span>Next update</span><strong>2 min</strong></div></div>
      <div className="callout"><strong>You can still reach Campus West</strong><p>Walk 4 min to Hill View stop, then board replacement AV36.</p></div>
      <Button onClick={() => { setHelpSent(false); setOnboardBus(null); go('recovery') }}><Icon name="walk" size={21} /> View replacement route</Button>
      <Button secondary onClick={() => go('help')}>Get assistance</Button>
    </>,
    help: <>
      <Header kicker="Support" title="How can we help?" subtitle="An assistant can see your bus and journey." />
      <button className="help-option" disabled={helpSent || !onboardBus} onClick={() => setHelpSent(true)}><span><Icon name="help" /></span><div><strong>Onboard assistant</strong><p>{helpSent ? 'Request already in queue' : onboardBus ? 'Ask for help on your bus' : 'Available after you board a bus'}</p></div></button>
      <button className="help-option" onClick={() => { window.location.href = 'tel:+6500000000' }}><span><Icon name="phone" /></span><div><strong>Call online help</strong><p>Speak to remote support now</p></div></button>
      {helpSent && <div className="sent" role="status" aria-live="polite"><Icon name="check" /><div><strong>Onboard assistant requested</strong><span>You’re next in the queue · about 2 min</span></div><button onClick={() => setHelpSent(false)}>Leave queue</button></div>}
      <Button secondary onClick={() => back()}>Back to journey</Button>
      <footer className="support-links" aria-label="Support information"><a href="#privacy">Privacy</a><span aria-hidden="true">·</span><a href="#terms">Terms &amp; conditions</a><span aria-hidden="true">·</span><a href="#faq">FAQ</a></footer>
    </>,
    recovery: <>
      <Header kicker="Replacement route · step 1 of 2" title="Walk to Hill View stop" subtitle="Replacement AV36 leaves in 6 min. Your destination stays the same." />
      <MapPreview walking />
      <div className="info-strip"><Icon name="walk" /><div><strong>260 m · 4 min</strong><span>Follow the sheltered path to Bay 3</span></div></div>
      <div className="replacement-stops"><span>Replacement journey</span><strong>AV36 · Hill View → Campus Library → Campus West</strong></div>
      <Button onClick={() => { setReplacementRoute(true); setTransferStop(0); go('transfer') }}>I’m at Hill View stop</Button>
      <Button secondary onClick={() => go('help')}>I need help</Button>
    </>,
    transfer: <>
      <Header
        kicker={replacementRoute ? 'Replacement service · North Park' : 'Transfer · Pine Street'}
        title={`${activeTransferBus} arrives in 2 min`}
        subtitle={replacementRoute ? 'Your replacement AV uses a new route to the same destination.' : 'Stay at the stop and wait at Bay 1 towards Campus West.'}
      />
      <MapPreview />
      {replacementRoute && <div className="replacement-stops"><span>New stops</span><strong>North Park → Hill View → Campus Library → Campus West</strong></div>}
      <div className="bus-ticket compact"><span>{replacementRoute ? 'Replacement bus' : 'Next bus'}</span><strong>{activeTransferBus}</strong><p>Bay 1 · low-floor boarding</p></div>
      <Button onClick={() => go('transferBoarding')}>I see {activeTransferBus}</Button>
      <Button secondary onClick={() => go('help')}>Get help</Button>
    </>,
    transferBoarding: <>
      <div className="hero-icon"><Icon name="bus" size={38} /></div>
      <Header kicker={replacementRoute ? 'Replacement bus' : 'Final bus'} title={`Board ${activeTransferBus}`} subtitle="Check the display says Campus West." />
      <div className="bus-ticket"><span>Autonomous bus</span><strong>{activeTransferBus}</strong><p>towards Campus West</p></div>
      <Button onClick={() => { setHelpSent(false); setOnboardBus('transfer'); go('arrival') }}><Icon name="check" size={21} /> I’m onboard</Button>
      <Button secondary onClick={() => go('transfer')}>Not this bus</Button>
    </>,
    arrival: <>
      <Header
        kicker={`Onboard ${activeTransferBus} · ${transferStop + 1} of ${activeTransferStops.length} stops`}
        title={transferStop === activeTransferStops.length - 1 ? 'Campus West reached' : `Next: ${activeTransferStops[transferStop + 1]?.name}`}
        subtitle={transferStop === activeTransferStops.length - 1 ? 'This is your final stop. Exit on the left.' : `${activeTransferStops.length - transferStop - 1} stops until your final destination.`}
      />
      <OnboardMap stopIndex={transferStop} moving={transferBusMoving} stops={activeTransferStops} />
      <div className="stop-status" role="status" aria-live="polite">
        <span className={transferStop === activeTransferStops.length - 1 ? 'arrived' : ''}>
          {transferStop === activeTransferStops.length - 1 ? <Icon name="check" /> : <Icon name="bus" />}
        </span>
        <div>
          <small>{transferStop === activeTransferStops.length - 1 ? 'Destination reached' : 'Current stop'}</small>
          <strong>{activeTransferStops[transferStop].name}</strong>
        </div>
        <b>{activeTransferStops[transferStop].note}</b>
      </div>
      <ol className="compact-stops transfer-stops" aria-label="Bus stop progress">
        {activeTransferStops.map((stop, index) => (
          <li key={stop.name} className={index < transferStop ? 'reached' : index === transferStop ? 'current' : ''}>
            <span>{index < transferStop ? '✓' : index + 1}</span>
            <strong>{stop.name}</strong>
            <small>{index < transferStop ? 'Passed' : index === transferStop ? 'You are here' : stop.note}</small>
          </li>
        ))}
      </ol>
      {transferStop < activeTransferStops.length - 1 ? (
        <Button onClick={() => setTransferBusMoving(!transferBusMoving)}>
          <Icon name={transferBusMoving ? 'clock' : 'bus'} size={21} />
          {transferBusMoving ? 'Pause live journey' : transferStop > 0 ? 'Continue live journey' : 'Start live journey'}
        </Button>
      ) : (
        <Button onClick={() => { setHelpSent(false); setOnboardBus(null); go('feedback') }}><Icon name="check" size={21} /> Finish journey</Button>
      )}
      <Button secondary onClick={() => go('help')}>Get help</Button>
    </>,
    feedback: <>
      <Header kicker="Journey complete" title="How was your trip?" subtitle="Your feedback improves future journeys." />
      <fieldset className="rating"><legend>Rate this journey</legend>{[1, 2, 3, 4, 5].map((n) => <button key={n} onClick={() => setRating(n)} className={rating >= n ? 'selected' : ''} aria-label={`${n} star${n > 1 ? 's' : ''}`}>★</button>)}</fieldset>
      <label className="comment"><span>Anything else? <small>Optional</small></span><textarea placeholder="Tell us what worked or what could improve" /></label>
      <Button onClick={() => go('done')} disabled={!rating}>Send feedback</Button>
      <button className="text-button" onClick={() => go('done')}>Skip for now</button>
    </>,
    done: <>
      <div className="hero-icon complete"><Icon name="check" size={40} /></div>
      <Header kicker="Arrived 9:10" title="You’re at Campus West" subtitle="Your journey is complete." />
      <div className="summary-card"><div><span>Total time</span><strong>28 min</strong></div><div><span>Buses</span><strong>2</strong></div><div><span>Walked</span><strong>260 m</strong></div></div>
      <Button onClick={() => { setRating(0); setHelpSent(false); setOnboardBus(null); setOnboardStop(0); setTransferStop(0); setTransferAlertDismissed(false); setDestinationAlertDismissed(false); setReplacementRoute(false); go('plan') }}>Plan another trip</Button>
    </>,
    settings: <>
      <Header kicker="Preferences" title="Settings" subtitle="Adjust the app to suit your journey." />
      <section className="settings-list">
        <div className="setting-row">
          <div><strong>Dark mode</strong><span>Use darker colours and reduce glare</span></div>
          <button className={`toggle ${darkMode ? 'on' : ''}`} type="button" role="switch" aria-checked={darkMode} onClick={() => setDarkMode(!darkMode)}><span /></button>
        </div>
        <div className="setting-row">
          <div><strong>Large text</strong><span>Increase text throughout the app</span></div>
          <button className={`toggle ${largeText ? 'on' : ''}`} type="button" role="switch" aria-checked={largeText} onClick={() => setLargeText(!largeText)}><span /></button>
        </div>
        <div className="setting-row">
          <div><strong>Journey alerts</strong><span>Arrival and alighting notifications</span></div>
          <button className={`toggle ${journeyAlerts ? 'on' : ''}`} type="button" role="switch" aria-checked={journeyAlerts} onClick={() => setJourneyAlerts(!journeyAlerts)}><span /></button>
        </div>
      </section>
    </>,
  }

  return (
    <main className={`app ${darkMode ? 'dark' : ''} ${largeText ? 'large-text' : ''}`}>
      <section className="device">
        <header className="appbar">
          <button aria-label="Go to previous screen" onClick={back} disabled={screenHistory.length === 0}><Icon name="back" /></button>
          <div><Icon name="bus" size={19} /><strong>MoveAV</strong></div>
          <button aria-label="Get help" onClick={() => go('help')}><Icon name="help" /></button>
        </header>
        <div className="screen-content">{content[screen]}</div>
        <nav className="bottom-nav" aria-label="Main navigation">
          <button className={screen !== 'help' && screen !== 'settings' ? 'active' : ''} onClick={() => go('plan')}><Icon name="route" /><span>Journey</span></button>
          <button className={screen === 'help' ? 'active' : ''} onClick={() => go('help')}><Icon name="help" /><span>Help</span></button>
          <button className={screen === 'settings' ? 'active' : ''} onClick={() => go('settings')}><Icon name="settings" /><span>Settings</span></button>
        </nav>
        {journeyAlerts && screen === 'journey' && transferModalReady && !transferAlertDismissed && (
          <div className="modal-backdrop">
            <section className="arrival-modal" role="alertdialog" aria-modal="true" aria-labelledby="arrival-title" aria-describedby="arrival-description">
              <div className="modal-icon"><Icon name="location" size={30} /></div>
              <p>Transfer stop reached</p>
              <h2 id="arrival-title">Please alight at Pine Street</h2>
              <span id="arrival-description">Leave AV84 here. Your transfer bus AV12 arrives at this stop in 2 minutes.</span>
              <Button onClick={() => { setHelpSent(false); setOnboardBus(null); setTransferAlertDismissed(true); setReplacementRoute(false); setTransferStop(0); go('transfer') }}><Icon name="bus" size={20} /> Track AV12</Button>
              <button className="text-button" onClick={() => setTransferAlertDismissed(true)}>Dismiss</button>
            </section>
          </div>
        )}
        {journeyAlerts && screen === 'arrival' && destinationModalReady && !destinationAlertDismissed && (
          <div className="modal-backdrop">
            <section className="arrival-modal" role="alertdialog" aria-modal="true" aria-labelledby="destination-title" aria-describedby="destination-description">
              <div className="modal-icon"><Icon name="check" size={30} /></div>
              <p>Final destination reached</p>
              <h2 id="destination-title">Please alight at Campus West</h2>
              <span id="destination-description">{activeTransferBus} has reached your destination. Check your belongings before leaving.</span>
              <Button onClick={() => { setHelpSent(false); setOnboardBus(null); setDestinationAlertDismissed(true); go('feedback') }}><Icon name="check" size={20} /> Finish journey</Button>
              <button className="text-button" onClick={() => setDestinationAlertDismissed(true)}>Dismiss</button>
            </section>
          </div>
        )}
      </section>
    </main>
  )
}

function Header({ kicker, title, subtitle }: { kicker: string; title: string; subtitle: string }) {
  return <header className="screen-header"><p>{kicker}</p><h1>{title}</h1><span>{subtitle}</span></header>
}
