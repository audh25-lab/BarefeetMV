import * as THREE from "three"

export type CompanionMood = "neutral" | "happy" | "curious" | "calm"

export class CompanionAvatar3D {
  mesh: THREE.Group
  mood: CompanionMood = "neutral"

  constructor(public name: string) {
    this.mesh = new THREE.Group()
    this.build()
  }

  private build() {
    // Body
    const body = new THREE.Mesh(
      new THREE.SphereGeometry(0.35, 32, 32),
      new THREE.MeshStandardMaterial({
        color: "#00e5ff",
        emissive: "#004466",
        emissiveIntensity: 0.6
      })
    )

    // Eyes
    const eyeMat = new THREE.MeshStandardMaterial({ color: "#fff" })
    const eyeGeo = new THREE.SphereGeometry(0.05, 16, 16)

    const leftEye = new THREE.Mesh(eyeGeo, eyeMat)
    const rightEye = new THREE.Mesh(eyeGeo, eyeMat)

    leftEye.position.set(-0.1, 0.1, 0.3)
    rightEye.position.set(0.1, 0.1, 0.3)

    this.mesh.add(body, leftEye, rightEye)
    this.mesh.position.y = 1.6
  }

  setMood(mood: CompanionMood) {
    this.mood = mood

    const body = this.mesh.children[0] as THREE.Mesh
    const mat = body.material as THREE.MeshStandardMaterial

    if (mood === "happy") mat.emissiveIntensity = 1
    if (mood === "curious") mat.color.set("#00ffcc")
    if (mood === "calm") mat.emissiveIntensity = 0.3
    if (mood === "neutral") mat.emissiveIntensity = 0.6
  }

  update(dt: number) {
    // Gentle floating motion
    this.mesh.position.y =
      1.6 + Math.sin(performance.now() * 0.002) * 0.05
  }
}