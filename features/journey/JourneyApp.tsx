'use client'

import { useEffect, useRef } from 'react'
import AppBar from '../../components/layout/AppBar'
import BottomNav from '../../components/layout/BottomNav'
import { JourneyProvider, useJourney } from './JourneyContext'
import JourneyModals from './JourneyModals'
import { screenComponents } from './screens'

function Shell() {
  const { screen, tripScreen, backTarget, darkMode, largeText, back, go } = useJourney()
  const CurrentScreen = screenComponents[screen]
  const contentRef = useRef<HTMLDivElement>(null)

  // every new screen starts at the top (the page itself doesn't scroll, this box does)
  useEffect(() => {
    contentRef.current?.scrollTo({ top: 0 })
  }, [screen])

  return (
    <main className={`app ${darkMode ? 'dark' : ''} ${largeText ? 'large-text' : ''}`}>
      <section className="device">
        <AppBar backTarget={backTarget} onBack={back} onHelp={() => go('help')} />
        <div className="screen-content" ref={contentRef}><CurrentScreen /></div>
        <BottomNav screen={screen} tripScreen={tripScreen} go={go} />
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