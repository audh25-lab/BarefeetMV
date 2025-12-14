export class UserMind {
  curiosity = 1
  memory = 0.5
  joy = 0.8

  adapt(event: string) {
    if (event === "learn") this.curiosity += 0.1
    if (event === "play") this.joy += 0.1
  }
}