'use client'

import Header from '../../../components/ui/Header'
import Icon from '../../../components/ui/Icon'
import Button from '../../../components/ui/button'
import OnboardTracker, { LiveJourneyButton } from '../../../components/journey/OnboardTracker'
import { useJourney } from '../JourneyContext'

export default function ArrivalScreen() {
  const { destination, activeTransferBus, activeTransferStops: stops, transfer, finishJourney, go } = useJourney()
  const stopIndex = transfer.stopIndex
  const atEnd = stopIndex === stops.length - 1
  return <>
    <Header
      kicker={`Onboard ${activeTransferBus} · ${stopIndex + 1} of ${stops.length} stops`}
      title={atEnd ? `${destination} reached` : `Next: ${stops[stopIndex + 1]?.name}`}
      subtitle={atEnd ? 'This is your final stop. Exit on the left.' : `${stops.length - stopIndex - 1} stops until your final destination.`}
    />
    <OnboardTracker stops={stops} stopIndex={stopIndex} moving={transfer.moving} endLabel="Destination reached" listClassName="transfer-stops" />
    {!atEnd ? (
      <LiveJourneyButton moving={transfer.moving} stopIndex={stopIndex} onToggle={transfer.toggle} />
    ) : (
      <Button onClick={finishJourney}><Icon name="check" size={21} /> Finish journey</Button>
    )}
    <Button secondary onClick={() => go('help')}>Get help</Button>
  </>
}
