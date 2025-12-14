export type HistoryNode = {
  country: string
  era: string
  summary: string
}

export class WorldHistoryEngine {
  private data: HistoryNode[] = []

  add(node: HistoryNode) {
    this.data.push(node)
  }

  getByCountry(country: string) {
    return this.data.filter(h => h.country === country)
  }
}