export type WorldSnapshot = {
  island?: string
  companionMood: string
  memory: string[]
}

class WorldState {
  private state: WorldSnapshot = {
    companionMood: "calm",
    memory: []
  }

  get() {
    return this.state
  }

  set(patch: Partial<WorldSnapshot>) {
    this.state = { ...this.state, ...patch }
  }

  remember(event: string) {
    this.state.memory.push(event)
  }
}

export const worldState = new WorldState()