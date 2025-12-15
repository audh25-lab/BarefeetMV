import { CognitiveAI } from "../../../ai/CognitiveAI"

export default function ColorsGame() {
  const ai = new CognitiveAI("Barefeet", "Maldivian", "en")
  const result = ai.interact("happy", "colors", 4)

  return (
    <main>
      <h2>🎨 Colors Game</h2>
      <p>{result.response}</p>

      <div style={{ display: "flex", gap: 12, marginTop: 20 }}>
        <div style={{ width: 50, height: 50, background: "red" }} />
        <div style={{ width: 50, height: 50, background: "blue" }} />
        <div style={{ width: 50, height: 50, background: "green" }} />
      </div>
    </main>
  )
}