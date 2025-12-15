import * as THREE from "three"
import { CompanionAvatar } from "@/xr/CompanionAvatar"
import { worldState } from "./WorldState"

export class CompanionAgent {
  avatar: CompanionAvatar
  mesh: THREE.Mesh
  private announced = false

  constructor(scene: THREE.Scene) {
    this.avatar = new CompanionAvatar("Luma", "light")

    this.mesh = new THREE.Mesh(
      new THREE.SphereGeometry(0.3, 32, 32),
      new THREE.MeshStandardMaterial({
        color: "#00e5ff",
        emissive: "#00e5ff",
        emissiveIntensity: 0.4
      })
    )

    this.mesh.position.set(0, 1.5, -1.5)
    scene.add(this.mesh)
  }

  /** Call once after world boot */
  introduce() {
    if (this.announced) return
    worldState.remember(this.avatar.appear())
    this.announced = true
  }

  guide(topic: string) {
    worldState.remember(this.avatar.guide(topic))
  }

  update(elapsed: number) {
    this.mesh.position.y =
      1.5 + Math.sin(elapsed * 0.002) * 0.1
  }
}