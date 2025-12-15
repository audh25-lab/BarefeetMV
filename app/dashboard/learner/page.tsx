"use client"

import { getSession } from "@/lib/session"

export default function LearnerDashboard() {
  const session = getSession()

  const learner = JSON.parse(
    localStorage.getItem("barefeetmv:learner") || "{}"
  )

  return (
    <main>
      <h2>Welcome {session?.name}</h2>

      <p>Curiosity: {(learner.curiosity * 100).toFixed(0)}%</p>
      <p>Mastery: {(learner.mastery * 100).toFixed(0)}%</p>

      <button onClick={() => location.href = "/"}>Enter World 🌍</button>
    </main>
  )
}