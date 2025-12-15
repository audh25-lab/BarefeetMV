"use client"

import { setUserState } from "../lib/state"

export default function Home() {
  function start(age: number) {
    setUserState({ age, language: "en" })
    window.location.href = "/play"
  }

  return (
    <main>
      <h1>BarefeetMV 👣</h1>
      <p>Choose your age to begin:</p>

      <button onClick={() => start(4)}>Ages 3–5</button>
      <br /><br />
      <button onClick={() => start(7)}>Ages 6–9</button>
    </main>
  )
}