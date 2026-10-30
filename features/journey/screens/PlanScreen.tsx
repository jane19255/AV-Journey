'use client'

import Header from '../../../components/ui/Header'
import Icon from '../../../components/ui/Icon'
import Button from '../../../components/ui/Button'
import { useJourney } from '../JourneyContext'

export default function PlanScreen() {
  const { startLocation, setStartLocation, destination, setDestination, go } = useJourney()
  return <>
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
  </>
}
