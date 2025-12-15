"use client"

import { TeacherAuthoring } from "@/teacher/TeacherAuthoring"
import { useState } from "react"

export default function TeacherDashboard() {
  const [tool] = useState(new TeacherAuthoring())
  const [world, setWorld] = useState("")
  const [objective, setObjective] = useState("")

  return (
    <main>
      <h2>Teacher Authoring</h2>

      <input
        placeholder="World"
        onChange={e => setWorld(e.target.value)}
      />
      <input
        placeholder="Objective"
        onChange={e => setObjective(e.target.value)}
      />

      <button onClick={() => tool.create(world, objective)}>
        Create Lesson
      </button>

      <pre>{JSON.stringify(tool.lessons, null, 2)}</pre>
    </main>
  )
}