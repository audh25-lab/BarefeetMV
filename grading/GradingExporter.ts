export type GradeRecord = {
  learnerId: string
  skill: string
  score: number
}

export class GradingExporter {
  exportCSV(records: GradeRecord[]): string {
    return [
      "Learner,Skill,Score",
      ...records.map(
        r => `${r.learnerId},${r.skill},${r.score}`
      )
    ].join("\n")
  }
}