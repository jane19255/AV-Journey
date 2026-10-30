'use client'

import Header from '../../../components/ui/Header'
import Icon from '../../../components/ui/Icon'
import Button from '../../../components/ui/Button'
import { useJourney } from '../JourneyContext'

export default function DisruptionScreen() {
  const { activeFirstBus, goToReplacementRoute, go } = useJourney()
  return <>
    <div className="hero-icon alert"><Icon name="warning" size={36} /></div>
    <Header kicker="Service disruption" title={`${activeFirstBus} cannot continue`} subtitle="A sensor fault is being checked. The bus is safely stopped at Garden Link." />
    <div className="status-grid"><div><span>Expected delay</span><strong>15–20 min</strong></div><div><span>Next update</span><strong>2 min</strong></div></div>
    <div className="callout"><strong>You can still reach Campus West</strong><p>Walk 4 min to Hill View stop, then board replacement AV36.</p></div>
    <Button onClick={goToReplacementRoute}><Icon name="walk" size={21} /> View replacement route</Button>
    <Button secondary onClick={() => go('help')}>Get assistance</Button>
  </>
}
