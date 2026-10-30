'use client'

import Header from '../../../components/ui/Header'
import { useJourney } from '../JourneyContext'

export default function RoutesScreen() {
  const { selectRoute } = useJourney()
  return <>
    <Header kicker="2 routes found" title="Choose your route" subtitle="Both routes are step-free." />
    <button className="route-card recommended" onClick={() => selectRoute('A')}>
      <span className="tag">Suggested · fastest</span><div className="route-top"><strong>28 min</strong><span>Arrive 9:10</span></div>
      <div className="bus-line"><b>AV84</b><span /><b>AV12</b></div><p>1 same-stop transfer · 2 min wait</p>
    </button>
    <button className="route-card" onClick={() => selectRoute('B')}>
      <div className="route-top"><strong>35 min</strong><span>Arrive 9:17</span></div>
      <div className="bus-line alt"><b>AV22</b><span /><b>AV07</b></div><p>1 transfer · 6 min wait</p>
    </button>
  </>
}
