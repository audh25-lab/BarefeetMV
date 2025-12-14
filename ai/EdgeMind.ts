export class EdgeMind {
  think(input: string) {
    return {
      intent: input.length > 10 ? "explore" : "play",
      confidence: Math.random()
    }
  }
}
