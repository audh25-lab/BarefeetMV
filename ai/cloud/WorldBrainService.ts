export class WorldBrainService {
  sync(userId: string, localState: any) {
    return {
      status: "synced",
      evolution: Math.random()
    }
  }
}
