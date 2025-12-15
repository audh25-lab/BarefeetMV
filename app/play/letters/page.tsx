import { CognitiveAI } from "../../../ai/CognitiveAI"

export default function LettersGame() {
  const ai = new CognitiveAI("Barefeet", "Maldivian", "en")
  const result = ai.interact("happy", "letters", 5)

  return (
    <main>
      <h2>🔤 Letters Game</h2>
      <p>{result.response}</p>

      <div style={{ fontSize: 48, marginTop: 20 }}>
        A B C D
      </div>
    </main>
  )
}