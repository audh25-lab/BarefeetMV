import * as THREE from "three"

export class CityGrowth {
  buildings: THREE.Mesh[] = []
  level = 1

  constructor(private scene: THREE.Scene) {}

  grow(mastery: number) {
    const targetLevel = Math.floor(mastery * 10)

    while (this.level < targetLevel) {
      this.spawn()
      this.level++
    }
  }

  spawn() {
    const geo = new THREE.BoxGeometry(
      0.8,
      Math.random() * 3 + 1,
      0.8
    )

    const mat = new THREE.MeshStandardMaterial({
      color: "#c2b280"
    })

    const b = new THREE.Mesh(geo, mat)
    b.position.set(
      (Math.random() - 0.5) * 14,
      geo.parameters.height / 2,
      (Math.random() - 0.5) * 14
    )

    this.scene.add(b)
    this.buildings.push(b)
  }
}