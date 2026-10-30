import Icon from '../ui/Icon'
import type { Stop } from '../../_features/journey/data'

export default function OnboardMap({
  stopIndex,
  moving,
  stops,
}: {
  stopIndex: number
  moving: boolean
  stops: Stop[]
}) {
  return (
    <div className="onboard-map" aria-label={`Live route map. ${stops[stopIndex].name} ${stopIndex === stops.length - 1 ? 'reached' : 'is the latest stop'}`}>
      <span className="map-road one">Campus Road</span>
      <span className="map-road two">Pine Street</span>
      <svg viewBox="0 0 500 260" aria-hidden="true">
        <path className="route-base" d="M45 215 C110 185 115 120 190 130 S290 180 330 105 S405 55 460 48" />
        <path className="route-done" pathLength="100" d="M45 215 C110 185 115 120 190 130 S290 180 330 105 S405 55 460 48" style={{ strokeDashoffset: 100 - (stopIndex / (stops.length - 1)) * 100 }} />
      </svg>
      {stops.map((stop, index) => (
        <div
          className={`route-stop ${index < stopIndex ? 'reached' : index === stopIndex ? 'current' : ''}`}
          key={stop.name}
          style={{ left: `${stop.left}%`, top: `${stop.top}%` }}
        >
          <span>{index < stopIndex ? '✓' : index + 1}</span>
          <strong>{stop.name}</strong>
        </div>
      ))}
      <div
        className={`moving-bus ${moving ? 'is-moving' : ''}`}
        style={{ left: `${stops[stopIndex].left}%`, top: `${stops[stopIndex].top}%` }}
      >
        <Icon name="bus" size={18} />
      </div>
      <div className="live-badge"><i /> Live location</div>
    </div>
  )
}
