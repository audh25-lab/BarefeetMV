import * as THREE from "three"

export type ScenePack = {
  name: string
  build(scene: THREE.Scene): void
}

export const RomanScene: ScenePack = {
  name: "Roman Empire",

  build(scene) {
    const floor = new THREE.Mesh(
      new THREE.PlaneGeometry(100, 100),
      new THREE.MeshStandardMaterial({ color: "#c2b280" })
    )
    floor.rotation.x = -Math.PI / 2

    const column = new THREE.Mesh(
      new THREE.CylinderGeometry(0.4, 0.4, 4, 16),
      new THREE.MeshStandardMaterial({ color: "#eee" })
    )
    column.position.set(0, 2, -5)

    scene.add(floor, column)
  }
}

export const ChinaScene: ScenePack = {
  name: "Ancient China",

  build(scene) {
    const ground = new THREE.Mesh(
      new THREE.PlaneGeometry(100, 100),
      new THREE.MeshStandardMaterial({ color: "#3c5f3c" })
    )
    ground.rotation.x = -Math.PI / 2

    const pagoda = new THREE.Mesh(
      new THREE.ConeGeometry(2, 4, 4),
      new THREE.MeshStandardMaterial({ color: "#aa0000" })
    )
    pagoda.position.set(0, 2, -6)

    scene.add(ground, pagoda)
  }
}