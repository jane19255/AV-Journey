import Icon from '../ui/Icon'
import type { Screen } from '../../features/journey/data'

// what the back button says to screen readers, e.g. "Back to route options"
const screenNames: Record<Screen, string> = {
  plan: 'journey planner',
  routes: 'route options',
  tracking: 'bus tracking',
  boarding: 'boarding check',
  journey: 'your journey',
  disruption: 'service disruption',
  help: 'help',
  recovery: 'walking directions',
  transfer: 'transfer',
  transferBoarding: 'boarding check',
  arrival: 'your journey',
  feedback: 'feedback',
  done: 'trip summary',
  settings: 'settings',
}

export default function AppBar({ backTarget, onBack, onHelp }: { backTarget: Screen | null; onBack: () => void; onHelp: () => void }) {
  return (
    <header className="appbar">
      {/* no back button when there is nowhere sensible to go back to; the empty span keeps the logo centred */}
      {backTarget
        ? <button aria-label={`Back to ${screenNames[backTarget]}`} onClick={onBack}><Icon name="back" /></button>
        : <span aria-hidden="true" />}
      <div><Icon name="bus" size={19} /><strong>MoveAV</strong></div>
      <button aria-label="Get help" onClick={onHelp}><Icon name="help" /></button>
    </header>
  )
}