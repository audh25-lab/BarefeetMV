import { EdgeMind } from "../../ai/EdgeMind"

export class VoiceIntentBridge {
  mind = new EdgeMind()

  handleSpeech(text: string) {
    const thought = this.mind.think(text)

    if (thought.intent === "explore") return "open-portal"
    if (thought.intent === "play") return "spawn-game"

    return "idle"
  }
}