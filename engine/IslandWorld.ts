import * as THREE from "three"
import { MaldivesIslands } from "@/xr/IslandScene"
import { worldState } from "./WorldState"

export function loadIsland(scene: THREE.Scene, name: string) {
  const island = MaldivesIslands.find(i => i.name === name)
  if (!island) return

  worldState.set({ island: island.name })

  const ground = new THREE.Mesh(
    new THREE.CircleGeometry(5, 64),
    new THREE.MeshStandardMaterial({ color: "#0047ab" })
  )
  ground.rotation.x = -Math.PI / 2
  scene.add(ground)

  const light = new THREE.HemisphereLight("#ffffff", "#0047ab", 1.2)
  scene.add(light)
}