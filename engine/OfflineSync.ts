import { OfflineIsland } from "@/system/OfflineIsland"
import { worldState } from "./WorldState"

export class OfflineSync {
  storage = new OfflineIsland()

  save() {
    this.storage.store("world", worldState.get())
  }

  restore() {
    const data = this.storage.load("world")
    if (data) {
      worldState.set(data)
    }
  }
}