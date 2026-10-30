'use client'

import Header from '../../../components/ui/Header'
import Icon from '../../../components/ui/Icon'
import Button from '../../../components/ui/Button'
import { useJourney } from '../JourneyContext'

export default function HelpScreen() {
  const { helpSent, setHelpSent, onboardBus, back } = useJourney()
  return <>
    <Header kicker="Support" title="How can we help?" subtitle="An assistant can see your bus and journey." />
    <button className="help-option" disabled={helpSent || !onboardBus} onClick={() => setHelpSent(true)}><span><Icon name="help" /></span><div><strong>Onboard assistant</strong><p>{helpSent ? 'Request already in queue' : onboardBus ? 'Ask for help on your bus' : 'Available after you board a bus'}</p></div></button>
    <button className="help-option" onClick={() => { window.location.href = 'tel:+6500000000' }}><span><Icon name="phone" /></span><div><strong>Call online help</strong><p>Speak to remote support now</p></div></button>
    {helpSent && <div className="sent" role="status" aria-live="polite"><Icon name="check" /><div><strong>Onboard assistant requested</strong><span>You’re next in the queue · about 2 min</span></div><button onClick={() => setHelpSent(false)}>Leave queue</button></div>}
    <Button secondary onClick={() => back()}>Back to journey</Button>
    <footer className="support-links" aria-label="Support information"><a href="#privacy">Privacy</a><span aria-hidden="true">·</span><a href="#terms">Terms &amp; conditions</a><span aria-hidden="true">·</span><a href="#faq">FAQ</a></footer>
  </>
}
