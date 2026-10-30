'use client'

import Header from '../../../components/ui/Header'
import Icon from '../../../components/ui/Icon'
import Button from '../../../components/ui/Button'
import { useJourney } from '../JourneyContext'

export default function BoardingScreen() {
  const { activeFirstBus, confirmFirstBoarding, go } = useJourney()
  return <>
    <div className="hero-icon"><Icon name="bus" size={38} /></div>
    <Header kicker="Check before boarding" title="Is this your bus?" subtitle="Confirm the number and direction shown on the bus." />
    <div className="bus-ticket"><span>Autonomous bus</span><strong>{activeFirstBus}</strong><p>towards North Park</p></div>
    <Button onClick={confirmFirstBoarding}><Icon name="check" size={21} /> Yes, I’m onboard</Button>
    <Button secondary onClick={() => go('tracking')}>Not this bus</Button>
  </>
}
