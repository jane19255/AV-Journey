'use client'

import { useState } from 'react'
import Header from '../../../components/ui/Header'
import Icon from '../../../components/ui/Icon'
import Button from '../../../components/ui/button'
import MapPreview from '../../../components/map/MapPreview'
import { useJourney } from '../JourneyContext'

// Studio 6 experiment: two versions of this screen.
//   Version A (normal link)          → map-based guidance (walking map + replacement route on the map)
//   Version B (link ending ?guide=text) → the same information as text only, no map
const isTextOnlyVersion = () =>
  typeof window !== 'undefined' && new URLSearchParams(window.location.search).get('guide') === 'text'

export default function RecoveryScreen() {
  const { destination, startReplacementTransfer, go } = useJourney()
  const [textOnly] = useState(isTextOnlyVersion)

  return <>
    <Header kicker="Replacement route · step 1 of 2" title="Walk to Hill View stop" subtitle="Replacement AV36 leaves in 6 min. Your destination stays the same." />
    {textOnly ? (
      <div className="replacement-stops">
        <span>Replacement journey</span>
        <strong>Walk about 4 min from Garden Link to Hill View stop, then board AV36: Hill View → Campus Library → {destination}</strong>
      </div>
    ) : (
      <MapPreview
        variant="walking"
        fromLabel="Garden Link"
        toLabel="Hill View"
        timeLabel="4 min walk"
        caption={{ label: 'Replacement journey', text: `AV36 · Hill View → Campus Library → ${destination}` }}
      />
    )}

    {/* <div className="info-strip"><Icon name="walk" /><div><strong>260 m · 4 min</strong><span>Follow the sheltered path to Bay 3</span></div></div> */}
    {/* <div className="replacement-stops"><span>Replacement journey</span><strong>AV36 · Hill View → Campus Library → {destination}</strong></div> */}
    <Button onClick={startReplacementTransfer}>I’m at Hill View stop</Button>
    {/* <Button secondary onClick={() => go('help')}>I need help</Button> */}
  </>
}