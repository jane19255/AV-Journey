'use client'

import Header from '../../../components/ui/Header'
import Button from '../../../components/ui/button'
import Icon from '../../../components/ui/Icon'
import MapPreview from '../../../components/map/MapPreview'
import { useJourney } from '../JourneyContext'

export default function TransferScreen() {
  const { destination, activeTransferStops, replacementRoute, activeTransferBus, go } = useJourney()
  return <>
    <Header
      kicker={`${replacementRoute ? 'Replacement service' : 'Transfer'} · ${activeTransferStops[0].name}`}
      title={`${activeTransferBus} arrives in 2 min`}
      subtitle={replacementRoute ? 'Your replacement AV uses a new route to the same destination.' : `Stay at the stop and wait at Bay 1 towards ${destination}.`}
    />
    <MapPreview
      variant={replacementRoute ? 'replacement' : 'transfer'}
      fromLabel={activeTransferStops[0].name}
      toLabel={activeTransferBus}
      timeLabel={`${activeTransferBus} · 2 min`}
    />

    {/* {replacementRoute && <div className="replacement-stops"><span>New stops</span><strong>{activeTransferStops.map((stop) => stop.name).join(' → ')}</strong></div>} */}
    {/* <div className="bus-ticket compact"><span>{replacementRoute ? 'Replacement bus' : 'Next bus'}</span><strong>{activeTransferBus}</strong><p>{replacementRoute ? 'Bay 3' : 'Bay 1'} · low-floor boarding</p></div> */}
    <div className="info-strip"><Icon name="clock" /><div><strong>Arrives 8:42</strong><span>Updated just now</span></div></div>
    <Button onClick={() => go('transferBoarding')}>I see {activeTransferBus}</Button>
    {/* <Button secondary onClick={() => go('help')}>Get help</Button> */}
  </>
}
