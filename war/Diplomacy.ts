export type Faction = {
  id: string
  name: string
  strength: number
}

export class DiplomacySystem {
  factions: Faction[] = []

  create(name: string) {
    this.factions.push({
      id: crypto.randomUUID(),
      name,
      strength: 10
    })
  }

  war(a: string, b: string) {
    const fa = this.factions.find(f => f.id === a)
    const fb = this.factions.find(f => f.id === b)
    if (!fa || !fb) return

    if (fa.strength > fb.strength) fa.strength++
    else fb.strength++
  }
}