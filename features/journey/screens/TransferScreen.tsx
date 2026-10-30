'use client'

import Header from '../../../components/ui/Header'
import Button from '../../../components/ui/Button'
import MapPreview from '../../../components/map/MapPreview'
import { useJourney } from '../JourneyContext'

export default function TransferScreen() {
  const { replacementRoute, activeTransferBus, go } = useJourney()
  return <>
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
  </>
}
