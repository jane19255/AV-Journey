'use client'

import Header from '../../../components/ui/Header'
import Icon from '../../../components/ui/Icon'
import Button from '../../../components/ui/Button'
import MapPreview from '../../../components/map/MapPreview'
import { useJourney } from '../JourneyContext'

export default function RecoveryScreen() {
  const { startReplacementTransfer, go } = useJourney()
  return <>
    <Header kicker="Replacement route · step 1 of 2" title="Walk to Hill View stop" subtitle="Replacement AV36 leaves in 6 min. Your destination stays the same." />
    <MapPreview walking />
    <div className="info-strip"><Icon name="walk" /><div><strong>260 m · 4 min</strong><span>Follow the sheltered path to Bay 3</span></div></div>
    <div className="replacement-stops"><span>Replacement journey</span><strong>AV36 · Hill View → Campus Library → Campus West</strong></div>
    <Button onClick={startReplacementTransfer}>I’m at Hill View stop</Button>
    <Button secondary onClick={() => go('help')}>I need help</Button>
  </>
}
