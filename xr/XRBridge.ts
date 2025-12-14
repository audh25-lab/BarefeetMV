import { XRWorld } from "./XRWorld"

export class XRBridge {
  world = new XRWorld()

  enter() {
    return this.world.enableXR()
      ? "Entered XR World"
      : "Fallback to Living Screen Mode"
  }
}