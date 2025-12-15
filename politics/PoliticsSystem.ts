export type Law = {
  id: string
  title: string
  effect: (world: any) => void
  votes: number
}

export class PoliticsSystem {
  laws: Law[] = []

  propose(title: string, effect: (world: any) => void) {
    this.laws.push({
      id: crypto.randomUUID(),
      title,
      effect,
      votes: 0
    })
  }

  vote(id: string) {
    const law = this.laws.find(l => l.id === id)
    if (law) law.votes++
  }

  enact(world: any) {
    this.laws
      .filter(l => l.votes >= 3)
      .forEach(l => l.effect(world))
  }
}