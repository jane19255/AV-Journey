'use client'

import Header from '../../../components/ui/Header'
import { useJourney } from '../JourneyContext'

function ToggleRow({ title, description, checked, onChange }: { title: string; description: string; checked: boolean; onChange: (value: boolean) => void }) {
  return (
    <div className="setting-row">
      <div><strong>{title}</strong><span>{description}</span></div>
      <button className={`toggle ${checked ? 'on' : ''}`} type="button" role="switch" aria-checked={checked} onClick={() => onChange(!checked)}><span /></button>
    </div>
  )
}

export default function SettingsScreen() {
  const { darkMode, setDarkMode, largeText, setLargeText, journeyAlerts, setJourneyAlerts } = useJourney()
  return <>
    <Header kicker="Preferences" title="Settings" subtitle="Adjust the app to suit your journey." />
    <section className="settings-list">
      <ToggleRow title="Dark mode" description="Use darker colours and reduce glare" checked={darkMode} onChange={setDarkMode} />
      <ToggleRow title="Large text" description="Increase text throughout the app" checked={largeText} onChange={setLargeText} />
      <ToggleRow title="Journey alerts" description="Arrival and alighting notifications" checked={journeyAlerts} onChange={setJourneyAlerts} />
    </section>
  </>
}
