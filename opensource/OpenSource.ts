export class OpenSourceManager {
  license = "Apache-2.0"
  contributors: string[] = []

  addContributor(name: string) {
    this.contributors.push(name)
  }

  manifest() {
    return {
      license: this.license,
      contributors: this.contributors
    }
  }
}