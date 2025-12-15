export type WorldSnapshot = {
  world: string
  learner: any
}

export class WorldSave {
  static save(snapshot: WorldSnapshot) {
    localStorage.setItem("barefeetmv:world", JSON.stringify(snapshot))
  }

  static load(): WorldSnapshot | null {
    const data = localStorage.getItem("barefeetmv:world")
    return data ? JSON.parse(data) : null
  }
}