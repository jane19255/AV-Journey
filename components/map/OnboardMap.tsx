import { useEffect, useRef, useState } from 'react'
import Icon from '../ui/Icon'
import type { Stop } from '../../features/journey/data'

// ---------------------------------------------------------------------------
// The route line, drawn in a 500 × 260 box as three curved segments.
// Each segment is [start, control 1, control 2, end].
// ---------------------------------------------------------------------------
type Point = [number, number]
const VIEW_W = 500
const VIEW_H = 260
const SEGMENTS: [Point, Point, Point, Point][] = [
  [[45, 215], [110, 185], [115, 120], [190, 130]],
  [[190, 130], [265, 140], [290, 180], [330, 105]],
  [[330, 105], [370, 30], [405, 55], [460, 48]],
]
const ROUTE_PATH = `M${SEGMENTS[0][0].join(' ')} ` + SEGMENTS.map(([, c1, c2, end]) => `C${c1.join(' ')} ${c2.join(' ')} ${end.join(' ')}`).join(' ')

// Sample the curve once so we can find "the point X% of the way along the line".
function bezier([p0, p1, p2, p3]: [Point, Point, Point, Point], t: number): Point {
  const u = 1 - t
  const a = u * u * u, b = 3 * u * u * t, c = 3 * u * t * t, d = t * t * t
  return [a * p0[0] + b * p1[0] + c * p2[0] + d * p3[0], a * p0[1] + b * p1[1] + c * p2[1] + d * p3[1]]
}
const SAMPLES: { point: Point; length: number }[] = []
{
  let total = 0
  let previous = SEGMENTS[0][0]
  SAMPLES.push({ point: previous, length: 0 })
  for (const segment of SEGMENTS) {
    for (let step = 1; step <= 60; step++) {
      const point = bezier(segment, step / 60)
      total += Math.hypot(point[0] - previous[0], point[1] - previous[1])
      SAMPLES.push({ point, length: total })
      previous = point
    }
  }
}
const ROUTE_LENGTH = SAMPLES[SAMPLES.length - 1].length

/** The point `fraction` (0–1) of the way along the route, in the 500 × 260 box. */
function routePoint(fraction: number): Point {
  const target = fraction * ROUTE_LENGTH
  const i = SAMPLES.findIndex((sample) => sample.length >= target)
  const after = SAMPLES[Math.max(i, 0)]
  const before = SAMPLES[Math.max(i - 1, 0)]
  const span = after.length - before.length || 1
  const t = (target - before.length) / span
  return [before.point[0] + (after.point[0] - before.point[0]) * t, before.point[1] + (after.point[1] - before.point[1]) * t]
}

/** Same point, as CSS `left` / `top` percentages of the map box. */
function pointAlongRoute(fraction: number) {
  const [x, y] = routePoint(fraction)
  return { left: `${(x / VIEW_W) * 100}%`, top: `${(y / VIEW_H) * 100}%` }
}

/** The part of the route from the start up to `fraction`, as an SVG path. */
function routeUpTo(fraction: number) {
  const target = fraction * ROUTE_LENGTH
  const points = SAMPLES.filter((sample) => sample.length < target).map((sample) => sample.point)
  points.push(routePoint(fraction))
  return 'M' + points.map(([x, y]) => `${x.toFixed(1)} ${y.toFixed(1)}`).join(' L')
}

/** Moves smoothly from the old value to `target` over `duration` ms, so the bus glides along the line. */
function useGlide(target: number, duration = 1300) {
  const [value, setValue] = useState(target)
  const current = useRef(target)

  useEffect(() => {
    const from = current.current
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (from === target || reduceMotion) {
      current.current = target
      setValue(target)
      return
    }
    const start = performance.now()
    let frame = 0
    const tick = (now: number) => {
      const t = Math.min((now - start) / duration, 1)
      const eased = t < 0.5 ? 2 * t * t : 1 - (-2 * t + 2) ** 2 / 2 // ease in-out
      current.current = from + (target - from) * eased
      setValue(current.current)
      if (t < 1) frame = requestAnimationFrame(tick)
    }
    frame = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(frame)
  }, [target, duration])

  return value
}

export default function OnboardMap({
  stopIndex,
  moving,
  stops,
}: {
  stopIndex: number
  moving: boolean
  stops: Stop[]
}) {
  // Stops are spread evenly along the line, so they always sit on it whatever the screen size.
  const positions = stops.map((_, index) => pointAlongRoute(stops.length > 1 ? index / (stops.length - 1) : 0))
  const progress = useGlide(stops.length > 1 ? stopIndex / (stops.length - 1) : 0)

  return (
    <div className="onboard-map" aria-label={`Live route map. ${stops[stopIndex].name} ${stopIndex === stops.length - 1 ? 'reached' : 'is the latest stop'}`}>
      <span className="map-road one">Campus Road</span>
      <span className="map-road two">Pine Street</span>
      {/* preserveAspectRatio="none" makes the line stretch with the box, exactly like the % positions do */}
      <svg viewBox={`0 0 ${VIEW_W} ${VIEW_H}`} preserveAspectRatio="none" aria-hidden="true">
        <path className="route-base" d={ROUTE_PATH} vectorEffect="non-scaling-stroke" />
        {progress > 0 && <path className="route-done" d={routeUpTo(progress)} vectorEffect="non-scaling-stroke" />}
      </svg>
      {stops.map((stop, index) => (
        <div
          className={`route-stop ${index < stopIndex ? 'reached' : index === stopIndex ? 'current' : ''} ${index === 0 ? 'first' : ''} ${index === stops.length - 1 ? 'last' : ''}`}
          key={`${index}-${stop.name}`}
          style={positions[index]}
        >
          <span>{index < stopIndex ? '✓' : index + 1}</span>
          <strong>{stop.name}</strong>
        </div>
      ))}
      <div className={`moving-bus ${moving ? 'is-moving' : ''}`} style={{ ...pointAlongRoute(progress), transition: 'none' }}>
        <Icon name="bus" size={18} />
      </div>
      <div className="live-badge"><i /> Live location</div>
    </div>
  )
}