'use client'

import Header from '../../../components/ui/Header'
import Icon from '../../../components/ui/Icon'
import Button from '../../../components/ui/Button'
import OnboardTracker, { LiveJourneyButton } from '../../../components/journey/OnboardTracker'
import { useJourney } from '../JourneyContext'

export default function JourneyScreen() {
  const { activeFirstBus, activeFirstStops: stops, first, trackTransferBus, go } = useJourney()
  const stopIndex = first.stopIndex
  const atEnd = stopIndex === stops.length - 1
  return <>
    <Header
      kicker={`Onboard ${activeFirstBus} · ${stopIndex + 1} of ${stops.length} stops`}
      title={atEnd ? 'Transfer stop reached' : `Next: ${stops[stopIndex + 1]?.name}`}
      subtitle={atEnd ? `Leave ${activeFirstBus} here, then continue to Campus West.` : `${stops.length - stopIndex - 1} stops remaining.`}
    />
    <OnboardTracker stops={stops} stopIndex={stopIndex} moving={first.moving} endLabel="Reached transfer stop" />
    {!atEnd ? (
      <LiveJourneyButton moving={first.moving} stopIndex={stopIndex} onToggle={first.toggle} />
    ) : (
      <Button onClick={trackTransferBus}><Icon name="bus" size={21} /> Track transfer bus AV12</Button>
    )}
    <Button secondary onClick={() => go('help')}>Get help</Button>
  </>
}
