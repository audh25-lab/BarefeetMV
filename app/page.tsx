import { CognitiveAI } from "../ai/CognitiveAI"

export default function Page() {
  const ai = new CognitiveAI("Barefeet", "Maldivian", "en")

  const result = ai.interact("happy", "letters", 6)

  return (
    <main style={{ padding: 24 }}>
      <h1>BarefeetMV 👣</h1>
      <p>{result.response}</p>
      <small>Mood: {result.emotion.mood}</small>
    </main>
  )
}