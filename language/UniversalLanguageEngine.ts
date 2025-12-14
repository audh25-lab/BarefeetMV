export type Language = {
  code: string
  name: string
  direction: "ltr" | "rtl"
  scripts: string[]
}

export class UniversalLanguageEngine {
  private registry: Record<string, Language> = {}

  register(lang: Language) {
    this.registry[lang.code] = lang
  }

  translate(text: string, target: string) {
    return `[${target}] ${text}`
  }

  listLanguages() {
    return Object.values(this.registry)
  }
}
