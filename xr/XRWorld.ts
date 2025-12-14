export class XRWorld {
  private mode: "screen" | "xr" = "screen"

  enableXR() {
    if ((navigator as any).xr) {
      this.mode = "xr"
      return true
    }
    return false
  }

  state() {
    return this.mode
  }
}