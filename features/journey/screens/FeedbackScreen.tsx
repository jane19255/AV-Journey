'use client'

import Header from '../../../components/ui/Header'
import Button from '../../../components/ui/Button'
import { useJourney } from '../JourneyContext'

export default function FeedbackScreen() {
  const { rating, setRating, go } = useJourney()
  return <>
    <Header kicker="Journey complete" title="How was your trip?" subtitle="Your feedback improves future journeys." />
    <fieldset className="rating"><legend>Rate this journey</legend>{[1, 2, 3, 4, 5].map((n) => <button key={n} onClick={() => setRating(n)} className={rating >= n ? 'selected' : ''} aria-label={`${n} star${n > 1 ? 's' : ''}`}>★</button>)}</fieldset>
    <label className="comment"><span>Anything else? <small>Optional</small></span><textarea placeholder="Tell us what worked or what could improve" /></label>
    <Button onClick={() => go('done')} disabled={!rating}>Send feedback</Button>
    <button className="text-button" onClick={() => go('done')}>Skip for now</button>
  </>
}
