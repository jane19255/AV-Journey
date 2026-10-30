'use client'

import AppBar from '../../components/layout/AppBar'
import BottomNav from '../../components/layout/BottomNav'
import { JourneyProvider, useJourney } from './JourneyContext'
import JourneyModals from './JourneyModals'
import { screenComponents } from './screens'

function Shell() {
  const { screen, darkMode, largeText, canGoBack, back, go } = useJourney()
  const CurrentScreen = screenComponents[screen]

  return (
    <main className={`app ${darkMode ? 'dark' : ''} ${largeText ? 'large-text' : ''}`}>
      <section className="device">
        <AppBar canGoBack={canGoBack} onBack={back} onHelp={() => go('help')} />
        <div className="screen-content"><CurrentScreen /></div>
        <BottomNav screen={screen} go={go} />
        <JourneyModals />
      </section>
    </main>
  )
}

export default function JourneyApp() {
  return (
    <JourneyProvider>
      <Shell />
    </JourneyProvider>
  )
}
