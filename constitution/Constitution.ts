export type Principle = {
  id: string
  text: string
}

export class Constitution {
  principles: Principle[] = []
  immutable = true

  found(texts: string[]) {
    if (this.principles.length > 0) return
    this.principles = texts.map(t => ({
      id: crypto.randomUUID(),
      text: t
    }))
  }

  validateLaw(lawText: string): boolean {
    return !this.principles.some(p =>
      lawText.includes("ban learning") ||
      lawText.includes("discriminate")
    )
  }
}