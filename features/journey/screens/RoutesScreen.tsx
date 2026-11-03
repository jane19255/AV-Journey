'use client'

import Header from '../../../components/ui/Header'
import Icon from '../../../components/ui/Icon'
import { useJourney } from '../JourneyContext'

export default function RoutesScreen() {
  const { startLocation, destination, selectRoute } = useJourney()
  return <>
    <Header kicker="2 routes found" title="Choose your route" subtitle={`${startLocation} → ${destination}. Both routes are step-free.`} />
    <p className="route-hint"><Icon name="chevron" size={16} /> Tap a route to select it and start tracking your bus.</p>

    <button
      className="route-card recommended"
      onClick={() => selectRoute('A')}
      aria-label="Select suggested route: 28 minutes, arrive 9:10, AV84 then AV12, 1 same-stop transfer"
    >
      <span className="tag">Suggested · fastest</span>
      <div className="route-top"><strong>28 min</strong><span>Arrive 9:10</span></div>
      <div className="bus-line"><b>AV84</b><span /><b>AV12</b></div>
      <p>1 same-stop transfer · 2 min wait</p>
      <span className="route-cta">Select this route <Icon name="chevron" size={18} /></span>
    </button>

    <button
      className="route-card"
      onClick={() => selectRoute('B')}
      aria-label="Select route: 35 minutes, arrive 9:17, AV22 then AV07, 1 transfer"
    >
      <div className="route-top"><strong>35 min</strong><span>Arrive 9:17</span></div>
      <div className="bus-line alt"><b>AV22</b><span /><b>AV07</b></div>
      <p>1 transfer · 6 min wait</p>
      <span className="route-cta">Select this route <Icon name="chevron" size={18} /></span>
    </button>
  </>
}