export class QuantumChat {
  send(from: string, to: string, thought: string) {
    return {
      from,
      to,
      resonance: thought.length * Math.random()
    }
  }
}