import Icon from '../ui/Icon'
import type { Screen } from '../../features/journey/data'

export default function BottomNav({ screen, tripScreen, go }: { screen: Screen; tripScreen: Screen; go: (next: Screen) => void }) {
  return (
    <nav className="bottom-nav" aria-label="Main navigation">
      <button className={screen !== 'help' && screen !== 'settings' ? 'active' : ''} onClick={() => go(tripScreen)}><Icon name="route" /><span>Journey</span></button>
      <button className={screen === 'help' ? 'active' : ''} onClick={() => go('help')}><Icon name="help" /><span>Help</span></button>
      <button className={screen === 'settings' ? 'active' : ''} onClick={() => go('settings')}><Icon name="settings" /><span>Settings</span></button>
    </nav>
  )
}