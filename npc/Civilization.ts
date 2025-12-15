import { NPC } from "./NPC"

export class Civilization {
  npcs: NPC[] = []

  spawn(role: any) {
    this.npcs.push(new NPC(role))
  }

  tick(economy: any) {
    this.npcs.forEach(npc => npc.act(economy))
  }
}