import type { CSSProperties } from 'react'
import Icon from '../ui/Icon'

type Point = { x: number; y: number } // percentages of the map box
type Marker = Point & { label: string; icon: string; tone: 'you' | 'bus' | 'stopped' }

export type MapVariant = 'tracking' | 'transfer' | 'replacement' | 'walking'

type Layout = {
  path: string // drawn in a 100 × 100 box, so it lines up with the % marker positions
  walking?: boolean
  from: Omit<Marker, 'label'>
  to: Omit<Marker, 'label'>
  chip: Point
  roads: [{ name: string; style: CSSProperties }, { name: string; style: CSSProperties }]
}

// One layout per stage of the trip, so every map looks like a different place.
const layouts: Record<MapVariant, Layout> = {
  // waiting at the starting stop; first bus coming from the north-east
  tracking: {
    path: 'M14 80 C30 62 26 42 46 44 S70 62 86 20',
    from: { x: 14, y: 80, icon: 'location', tone: 'you' },
    to: { x: 86, y: 20, icon: 'bus', tone: 'bus' },
    chip: { x: 50, y: 45 },
    roads: [
      { name: 'Campus Road', style: { left: '6%', bottom: '30%', transform: 'rotate(-24deg)' } },
      { name: 'North Avenue', style: { left: '58%', top: '66%', transform: 'rotate(-28deg)' } },
    ],
  },
  // waiting at the transfer stop; connecting bus coming from the south-east
  transfer: {
    path: 'M16 24 C38 22 42 52 60 56 S80 70 86 80',
    from: { x: 16, y: 24, icon: 'location', tone: 'you' },
    to: { x: 86, y: 80, icon: 'bus', tone: 'bus' },
    chip: { x: 44, y: 40 },
    roads: [
      { name: 'Pine Street', style: { left: '8%', top: '8%' } },
      { name: 'Library Walk', style: { right: '20%', bottom: '10%', transform: 'rotate(28deg)' } },
    ],
  },
  // waiting for the replacement bus, coming in from the east
  replacement: {
    path: 'M14 50 C28 74 52 76 64 54 S80 30 88 30',
    from: { x: 14, y: 50, icon: 'location', tone: 'you' },
    to: { x: 88, y: 30, icon: 'bus', tone: 'bus' },
    chip: { x: 40, y: 75 },
    roads: [
      { name: 'Hill View Road', style: { left: '30%', top: '18%' } },
      { name: 'Campus Loop', style: { left: '60%', bottom: '8%' } },
    ],
  },
  // walking from the broken-down bus to the replacement stop, along streets
  walking: {
    path: 'M14 80 L36 80 L36 50 L64 50 L64 24 L84 24',
    walking: true,
    from: { x: 14, y: 80, icon: 'warning', tone: 'stopped' },
    to: { x: 84, y: 24, icon: 'location', tone: 'you' },
    chip: { x: 50, y: 60 },
    roads: [
      { name: 'Garden Link', style: { left: '4%', bottom: '4%' } },
      { name: 'Sheltered path', style: { left: '42%', top: '62%' } },
    ],
  },
}

export default function MapPreview({
  variant,
  fromLabel,
  toLabel,
  timeLabel,
}: {
  variant: MapVariant
  fromLabel: string
  toLabel: string
  timeLabel: string
}) {
  const layout = layouts[variant]
  const markers: Marker[] = [
    { ...layout.from, label: fromLabel },
    { ...layout.to, label: toLabel },
  ]

  return (
    <div
      className={`mini-map map-${variant}`}
      role="img"
      aria-label={layout.walking ? `Walking route from ${fromLabel} to ${toLabel}, ${timeLabel}` : `Live map: ${toLabel} heading to ${fromLabel}, ${timeLabel}`}
    >
      {layout.roads.map((road) => <span key={road.name} className="map-road" style={road.style}>{road.name}</span>)}
      <svg viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true">
        <path className={layout.walking ? 'walk-path' : 'bus-path'} d={layout.path} vectorEffect="non-scaling-stroke" />
      </svg>
      {markers.map((marker) => (
        <div key={marker.tone + marker.label} className={`map-marker ${marker.tone}`} style={{ left: `${marker.x}%`, top: `${marker.y}%` }}>
          <span className="map-point"><Icon name={marker.icon} size={18} /></span>
          <small>{marker.label}</small>
        </div>
      ))}
      <span className="map-time" style={{ left: `${layout.chip.x}%`, top: `${layout.chip.y}%` }}>{timeLabel}</span>
    </div>
  )
}
