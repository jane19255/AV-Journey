'use client'

import { createContext, useContext, type ReactNode } from 'react'
import { useJourneyState, type Journey } from './useJourneyState'

const JourneyContext = createContext<Journey | null>(null)

export function JourneyProvider({ children }: { children: ReactNode }) {
  const journey = useJourneyState()
  return <JourneyContext.Provider value={journey}>{children}</JourneyContext.Provider>
}

export function useJourney() {
  const journey = useContext(JourneyContext)
  if (!journey) throw new Error('useJourney must be used inside <JourneyProvider>')
  return journey
}
