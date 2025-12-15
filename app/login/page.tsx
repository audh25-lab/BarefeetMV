"use client"

import { loginAs } from "@/lib/auth"
import { useRouter } from "next/navigation"

export default function LoginPage() {
  const router = useRouter()

  function enter(role: "learner" | "parent" | "teacher") {
    loginAs(role, role.toUpperCase())
    router.push(`/dashboard/${role}`)
  }

  return (
    <main style={{ padding: 40 }}>
      <h1>BarefeetMV</h1>
      <p>Select role</p>

      <button onClick={() => enter("learner")}>👦 Learner</button>
      <button onClick={() => enter("parent")}>👨‍👩‍👧 Parent</button>
      <button onClick={() => enter("teacher")}>🏫 Teacher</button>
    </main>
  )
}