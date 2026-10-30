'use client'

import Header from '../../../components/ui/Header'
import Icon from '../../../components/ui/Icon'
import Button from '../../../components/ui/Button'
import { useJourney } from '../JourneyContext'

export default function DoneScreen() {
  const { resetTrip } = useJourney()
  return <>
    <div className="hero-icon complete"><Icon name="check" size={40} /></div>
    <Header kicker="Arrived 9:10" title="You’re at Campus West" subtitle="Your journey is complete." />
    <div className="summary-card"><div><span>Total time</span><strong>28 min</strong></div><div><span>Buses</span><strong>2</strong></div><div><span>Walked</span><strong>260 m</strong></div></div>
    <Button onClick={resetTrip}>Plan another trip</Button>
  </>
}
