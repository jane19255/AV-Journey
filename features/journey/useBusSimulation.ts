import { useEffect, useState } from 'react'

/** Steps a bus through `stopCount` stops, one every `intervalMs`, while `moving` is true. */
export function useBusSimulation(stopCount: number, intervalMs = 1800) {
  const [stopIndex, setStopIndex] = useState(0)
  const [moving, setMoving] = useState(false)

  useEffect(() => {
    if (!moving || stopIndex === stopCount - 1) {
      if (stopIndex === stopCount - 1) setMoving(false)
      return
    }
    const timer = window.setTimeout(() => setStopIndex((stop) => Math.min(stop + 1, stopCount - 1)), intervalMs)
    return () => window.clearTimeout(timer)
  }, [moving, stopIndex, stopCount, intervalMs])

  return {
    stopIndex,
    moving,
    setStopIndex,
    setMoving,
    toggle: () => setMoving((value) => !value),
  }
}
