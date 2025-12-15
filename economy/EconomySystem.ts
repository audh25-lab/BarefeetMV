export type ResourceType =
  | "food"
  | "stone"
  | "wood"
  | "knowledge"
  | "gold"

export type Wallet = Record<ResourceType, number>

export class EconomySystem {
  wallet: Wallet = {
    food: 10,
    stone: 5,
    wood: 5,
    knowledge: 0,
    gold: 0
  }

  earn(type: ResourceType, amount: number) {
    this.wallet[type] += amount
  }

  spend(type: ResourceType, amount: number): boolean {
    if (this.wallet[type] < amount) return false
    this.wallet[type] -= amount
    return true
  }

  trade(from: ResourceType, to: ResourceType, rate = 1) {
    if (this.spend(from, rate)) {
      this.earn(to, 1)
    }
  }
}