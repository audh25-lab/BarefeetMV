import * as THREE from "three"
import { HistoryPortals } from "@/xr/HistoryPortals"
import { worldState } from "./WorldState"

export class HistoryPortalSystem {
  portals: THREE.Mesh[] = []

  constructor(scene: THREE.Scene) {
    HistoryPortals.forEach((p, i) => {
      const portal = new THREE.Mesh(
        new THREE.RingGeometry(0.6, 0.8, 32),
        new THREE.MeshStandardMaterial({
          color: "#ffd700",
          emissive: "#ffaa00"
        })
      )
      portal.position.set(i * 2 - 2, 1.2, -3)
      portal.userData = p
      scene.add(portal)
      this.portals.push(portal)
    })
  }

  checkEnter(camera: THREE.Camera) {
    this.portals.forEach(p => {
      if (p.position.distanceTo(camera.position) < 1) {
        const data = p.userData
        worldState.remember(
          `Entered ${data.country} – ${data.era}`
        )
      }
    })
  }
}