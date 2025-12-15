export type Skill =
  | "logic"
  | "memory"
  | "history"
  | "creativity"

export type SkillScore = Record<Skill, number>

export class AssessmentSystem {
  scores: SkillScore = {
    logic: 0,
    memory: 0,
    history: 0,
    creativity: 0
  }

  assess(skill: Skill, success: boolean) {
    this.scores[skill] += success ? 0.1 : -0.02
    this.scores[skill] = Math.max(0, Math.min(1, this.scores[skill]))
  }

  mastery(skill: Skill) {
    return this.scores[skill] > 0.75
  }
}