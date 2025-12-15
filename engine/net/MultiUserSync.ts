export type RemoteUserState = {
  id: string
  position: [number, number, number]
  emotion: string
}

export class MultiUserSync {
  users = new Map<string, RemoteUserState>()

  connect() {
    // Placeholder transport-safe abstraction
    console.log("Multi-user sync ready")
  }

  updateLocal(state: RemoteUserState) {
    this.users.set(state.id, state)
  }

  getRemoteUsers() {
    return [...this.users.values()]
  }
}