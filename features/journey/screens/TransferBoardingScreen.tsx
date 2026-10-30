'use client'

import Header from '../../../components/ui/Header'
import Icon from '../../../components/ui/Icon'
import Button from '../../../components/ui/Button'
import { useJourney } from '../JourneyContext'

export default function TransferBoardingScreen() {
  const { replacementRoute, activeTransferBus, confirmTransferBoarding, go } = useJourney()
  return <>
    <div className="hero-icon"><Icon name="bus" size={38} /></div>
    <Header kicker={replacementRoute ? 'Replacement bus' : 'Final bus'} title={`Board ${activeTransferBus}`} subtitle="Check the display says Campus West." />
    <div className="bus-ticket"><span>Autonomous bus</span><strong>{activeTransferBus}</strong><p>towards Campus West</p></div>
    <Button onClick={confirmTransferBoarding}><Icon name="check" size={21} /> I’m onboard</Button>
    <Button secondary onClick={() => go('transfer')}>Not this bus</Button>
  </>
}
