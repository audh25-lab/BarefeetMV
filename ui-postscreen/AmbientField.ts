export class AmbientField {
  private intensity = 0.5

  state() {
    return {
      glow: this.intensity,
      motion: Math.sin(Date.now() / 1000) * this.intensity
    }
  }
}