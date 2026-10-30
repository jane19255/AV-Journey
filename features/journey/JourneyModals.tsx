'use client'

import AlertModal from '../../components/journey/AlertModal'
import { useJourney } from './JourneyContext'

export default function JourneyModals() {
  const j = useJourney()

  return (
    <>
      {j.journeyAlerts && j.screen === 'journey' && j.transferModalReady && !j.transferAlertDismissed && (
        <AlertModal
          idPrefix="arrival"
          iconName="location"
          kicker="Transfer stop reached"
          title="Please alight at Pine Street"
          description="Leave AV84 here. Your transfer bus AV12 arrives at this stop in 2 minutes."
          actionIcon="bus"
          actionLabel="Track AV12"
          onAction={() => { j.setTransferAlertDismissed(true); j.trackTransferBus() }}
          onDismiss={() => j.setTransferAlertDismissed(true)}
        />
      )}
      {j.journeyAlerts && j.screen === 'arrival' && j.destinationModalReady && !j.destinationAlertDismissed && (
        <AlertModal
          idPrefix="destination"
          iconName="check"
          kicker="Final destination reached"
          title="Please alight at Campus West"
          description={`${j.activeTransferBus} has reached your destination. Check your belongings before leaving.`}
          actionIcon="check"
          actionLabel="Finish journey"
          onAction={() => { j.setDestinationAlertDismissed(true); j.finishJourney() }}
          onDismiss={() => j.setDestinationAlertDismissed(true)}
        />
      )}
    </>
  )
}
