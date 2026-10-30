import Icon from '../ui/Icon'
import Button from '../ui/Button'
import OnboardMap from '../map/OnboardMap'
import type { Stop } from '../../_features/journey/data'

/** Map + current-stop card + stop list. Shared by the "journey" and "arrival" screens. */
export default function OnboardTracker({
  stops,
  stopIndex,
  moving,
  endLabel,
  listClassName = '',
}: {
  stops: Stop[]
  stopIndex: number
  moving: boolean
  endLabel: string
  listClassName?: string
}) {
  const atEnd = stopIndex === stops.length - 1
  return (
    <>
      <OnboardMap stopIndex={stopIndex} moving={moving} stops={stops} />
      <div className="stop-status" role="status" aria-live="polite">
        <span className={atEnd ? 'arrived' : ''}>
          {atEnd ? <Icon name="check" /> : <Icon name="bus" />}
        </span>
        <div>
          <small>{atEnd ? endLabel : 'Current stop'}</small>
          <strong>{stops[stopIndex].name}</strong>
        </div>
        <b>{stops[stopIndex].note}</b>
      </div>
      <ol className={`compact-stops${listClassName ? ` ${listClassName}` : ''}`} aria-label="Bus stop progress">
        {stops.map((stop, index) => (
          <li key={stop.name} className={index < stopIndex ? 'reached' : index === stopIndex ? 'current' : ''}>
            <span>{index < stopIndex ? '✓' : index + 1}</span>
            <strong>{stop.name}</strong>
            <small>{index < stopIndex ? 'Passed' : index === stopIndex ? 'You are here' : stop.note}</small>
          </li>
        ))}
      </ol>
    </>
  )
}

export function LiveJourneyButton({ moving, stopIndex, onToggle }: { moving: boolean; stopIndex: number; onToggle: () => void }) {
  return (
    <Button onClick={onToggle}>
      <Icon name={moving ? 'clock' : 'bus'} size={21} />
      {moving ? 'Pause live journey' : stopIndex > 0 ? 'Continue live journey' : 'Start live journey'}
    </Button>
  )
}
