import Icon from '../ui/Icon'

export default function AppBar({ canGoBack, onBack, onHelp }: { canGoBack: boolean; onBack: () => void; onHelp: () => void }) {
  return (
    <header className="appbar">
      <button aria-label="Go to previous screen" onClick={onBack} disabled={!canGoBack}><Icon name="back" /></button>
      <div><Icon name="bus" size={19} /><strong>MoveAV</strong></div>
      <button aria-label="Get help" onClick={onHelp}><Icon name="help" /></button>
    </header>
  )
}
