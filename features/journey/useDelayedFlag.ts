import { useEffect, useState } from 'react'

/** Becomes true `delayMs` after `active` turns true; drops to false immediately when `active` is false. */
export function useDelayedFlag(active: boolean, delayMs = 1500) {
  const [ready, setReady] = useState(false)

  useEffect(() => {
    if (!active) {
      setReady(false)
      return
    }
    const timer = window.setTimeout(() => setReady(true), delayMs)
    return () => window.clearTimeout(timer)
  }, [active, delayMs])

  return ready
}
