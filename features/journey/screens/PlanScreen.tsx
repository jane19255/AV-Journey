'use client'

import { useEffect, useRef, useState } from 'react'
import Header from '../../../components/ui/Header'
import Icon from '../../../components/ui/Icon'
import Button from '../../../components/ui/button'
import { useJourney } from '../JourneyContext'

type FieldErrors = { from?: string; to?: string }

export default function PlanScreen() {
  const { startLocation, setStartLocation, destination, setDestination, go } = useJourney()
  const [errors, setErrors] = useState<FieldErrors>({})
  const fromRef = useRef<HTMLInputElement>(null)
  const toRef = useRef<HTMLInputElement>(null)
  const [locating, setLocating] = useState(false)
  const locateTimer = useRef<number | undefined>(undefined)

  // stop the fake "locating" timer if the user leaves the screen
  useEffect(() => () => window.clearTimeout(locateTimer.current), [])

  // Prototype: there is no real GPS lookup, so "Current location" always fills in SIT Punggol.
  const fillCurrentLocation = () => {
    if (locating) return
    setLocating(true)
    locateTimer.current = window.setTimeout(() => {
      setStartLocation('SIT Punggol')
      setErrors((e) => ({ ...e, from: undefined }))
      setLocating(false)
      if (!destination.trim()) toRef.current?.focus() // next thing to fill in
    }, 700)
  }

  const findRoutes = () => {
    const from = startLocation.trim()
    const to = destination.trim()
    const next: FieldErrors = {}
    if (!from) next.from = 'Enter where you are starting from.'
    if (!to) next.to = 'Enter where you want to go.'
    if (from && to && from.toLowerCase() === to.toLowerCase()) next.to = 'Your destination must be different from your starting point.'
    setErrors(next)

    if (next.from) return fromRef.current?.focus()
    if (next.to) return toRef.current?.focus()

    setStartLocation(from)
    setDestination(to)
    go('routes')
  }

  const swap = () => {
    setStartLocation(destination)
    setDestination(startLocation)
    setErrors({})
  }

  const pickRecentTrip = () => {
    setStartLocation('Maple Gate')
    setDestination('Campus West')
    setErrors({})
    go('routes')
  }

  return <>
    <Header kicker="Journey planner" title="Plan your journey" subtitle="Input your start and destination." />
    <form className={`location-fields${errors.from ? ' from-error' : ''}`} noValidate onSubmit={(event) => { event.preventDefault(); findRoutes() }}>
      <label>
        <span>From</span>
        <div className={errors.from ? 'invalid' : ''}>
          <Icon name="location" size={20} />
          <input
            ref={fromRef}
            value={startLocation}
            placeholder="Maple Gate"
            onChange={(event) => { setStartLocation(event.target.value); if (errors.from) setErrors((e) => ({ ...e, from: undefined })) }}
            aria-label="Starting location"
            aria-invalid={!!errors.from}
            aria-describedby={errors.from ? 'from-error' : undefined}
          />
        </div>
        {errors.from && <p className="field-error" id="from-error" role="alert"><Icon name="warning" size={16} /> {errors.from}</p>}
      </label>
      <button className="swap" type="button" aria-label="Swap locations" onClick={swap}><Icon name="swap" size={20} /></button>
      <label>
        <span>To</span>
        <div className={errors.to ? 'invalid' : ''}>
          <Icon name="location" size={20} />
          <input
            ref={toRef}
            value={destination}
            placeholder="Campus West"
            onChange={(event) => { setDestination(event.target.value); if (errors.to) setErrors((e) => ({ ...e, to: undefined })) }}
            aria-label="Destination"
            aria-invalid={!!errors.to}
            aria-describedby={errors.to ? 'to-error' : undefined}
          />
        </div>
        {errors.to && <p className="field-error" id="to-error" role="alert"><Icon name="warning" size={16} /> {errors.to}</p>}
      </label>
      {/* lets Enter in either field submit the form */}
      <button type="submit" hidden aria-hidden="true" tabIndex={-1} />
    </form>

    <div className="quick-row">
      <button type="button" onClick={fillCurrentLocation} aria-busy={locating} aria-live="polite"><Icon name="location" size={19} /> {locating ? 'Locating…' : 'Current location'}</button>
      {/* <button><Icon name="home" size={19} /> Saved places</button> */}
    </div>
    <Button onClick={findRoutes}>Find routes</Button>
    <section className="home-updates" aria-label="Journey updates">
      <div className="service-ok"><span><Icon name="check" size={18} /></span><div><strong>AV network is running normally</strong><small>All campus routes available</small></div></div>
      <button className="recent-trip" onClick={pickRecentTrip}><span>Recent journey</span><strong>Maple Gate → Campus West</strong><small>28 min · 1 transfer</small></button>
    </section>
  </>
}