export type LearnerProfileData = {
  curiosity: number
  mastery: number
  joy: number
  lastActive: number
}

const KEY = "barefeetmv:learner-profile"

export class LearnerProfile {
  data: LearnerProfileData

  constructor() {
    this.data = this.load()
  }

  private load(): LearnerProfileData {
    if (typeof localStorage === "undefined") {
      return this.default()
    }

    const raw = localStorage.getItem(KEY)
    return raw ? JSON.parse(raw) : this.default()
  }

  private default(): LearnerProfileData {
    return {
      curiosity: 0.5,
      mastery: 0.2,
      joy: 0.7,
      lastActive: Date.now()
    }
  }

  reinforce(event: "learn" | "play" | "explore") {
    if (event === "learn") this.data.mastery += 0.05
    if (event === "play") this.data.joy += 0.05
    if (event === "explore") this.data.curiosity += 0.05

    this.data.lastActive = Date.now()
    this.save()
  }

  snapshot() {
    return { ...this.data }
  }

  save() {
    localStorage.setItem(KEY, JSON.stringify(this.data))
  }
}