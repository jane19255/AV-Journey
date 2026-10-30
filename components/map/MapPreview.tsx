import Icon from '../ui/Icon'

export default function MapPreview({ walking = false }: { walking?: boolean }) {
  return (
    <div className="mini-map" role="img" aria-label={walking ? 'Walking route to Pine Street bus stop' : 'Live bus route map'}>
      <span className="map-road one">Campus Road</span><span className="map-road two">Pine Street</span>
      <svg viewBox="0 0 500 260" aria-hidden="true"><path d="M45 215 C110 185 115 120 190 130 S290 180 330 105 S405 55 460 48" /></svg>
      <span className="map-point start"><Icon name={walking ? 'walk' : 'location'} size={18} /></span>
      <span className="map-point finish"><Icon name="bus" size={18} /></span>
      <span className="map-time">{walking ? '4 min walk' : 'AV84 · 2 min'}</span>
    </div>
  )
}
