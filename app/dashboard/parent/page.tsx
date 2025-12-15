"use client"

import { getParentView } from "@/dashboards/ParentDashboard"

export default function ParentDashboard() {
  const learner = JSON.parse(
    localStorage.getItem("barefeetmv:learner") || "{}"
  )
  const cognitive = JSON.parse(
    localStorage.getItem("barefeetmv:cognitive") || "{}"
  )

  const view = getParentView(learner, cognitive)

  return (
    <main>
      <h2>Parent Dashboard</h2>

      <p>Age: {view.age}</p>
      <p>Mastery: {(view.mastery * 100).toFixed(0)}%</p>

      <h3>Cognitive Skills</h3>
      {Object.entries(view.cognitive).map(([k, v]) => (
        <div key={k}>{k}: {(v * 100).toFixed(0)}%</div>
      ))}

      <p>Recommendation: {view.recommendation}</p>
    </main>
  )
}