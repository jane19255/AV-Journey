'use client'

import Header from '../../../components/ui/Header'
import Icon from '../../../components/ui/Icon'
import Button from '../../../components/ui/Button'
import MapPreview from '../../../components/map/MapPreview'
import { useJourney } from '../JourneyContext'

export default function TrackingScreen() {
  const { activeFirstBus, go } = useJourney()
  return <>
    <Header kicker={`${activeFirstBus} · towards North Park`} title="Your bus is 2 min away" subtitle="Wait at Maple Gate, Bay 2." />
    <MapPreview />
    <div className="info-strip"><Icon name="clock" /><div><strong>Arrives 8:42</strong><span>Updated just now</span></div></div>
    <Button onClick={() => go('boarding')}>I see {activeFirstBus}</Button>
  </>
}
