import * as THREE from "three"

/* =========================
   BASE HISTORY INTERFACE
========================= */

export type HistoryEra = "early" | "peak" | "late"

export interface HistoryScenePack {
  name: string
  era: HistoryEra
  group: THREE.Group
  update(dt: number): void
}

/* =========================
   ROMAN CIVILIZATION
========================= */

export class RomanScene implements HistoryScenePack {
  name = "Roman Republic"
  era: HistoryEra = "early"
  group = new THREE.Group()

  private growth = 0

  constructor() {
    this.buildCore()
  }

  private buildCore() {
    // Column
    const column = new THREE.Mesh(
      new THREE.CylinderGeometry(0.2, 0.25, 2),
      new THREE.MeshStandardMaterial({ color: "#e0d8c3" })
    )
    column.position.set(2, 1, -2)
    this.group.add(column)

    // Forum floor
    const floor = new THREE.Mesh(
      new THREE.PlaneGeometry(4, 4),
      new THREE.MeshStandardMaterial({ color: "#c2b59b" })
    )
    floor.rotation.x = -Math.PI / 2
    floor.position.set(2, 0, -2)
    this.group.add(floor)
  }

  setEra(era: HistoryEra) {
    this.era = era
    this.group.scale.setScalar(
      era === "early" ? 0.8 : era === "peak" ? 1.2 : 0.9
    )
  }

  update(dt: number) {
    this.growth += dt
    this.group.rotation.y = Math.sin(this.growth * 0.1) * 0.02
  }
}

/* =========================
   IMPERIAL CHINA
========================= */

export class ChinaScene implements HistoryScenePack {
  name = "Imperial China"
  era: HistoryEra = "early"
  group = new THREE.Group()

  private pulse = 0

  constructor() {
    this.buildCore()
  }

  private buildCore() {
    // Gate
    const gate = new THREE.Mesh(
      new THREE.BoxGeometry(2, 1, 0.3),
      new THREE.MeshStandardMaterial({ color: "#aa3333" })
    )
    gate.position.set(-2, 1, -2)
    this.group.add(gate)

    // Roof
    const roof = new THREE.Mesh(
      new THREE.ConeGeometry(1.2, 0.5, 4),
      new THREE.MeshStandardMaterial({ color: "#552222" })
    )
    roof.position.set(-2, 1.6, -2)
    roof.rotation.y = Math.PI / 4
    this.group.add(roof)
  }

  setEra(era: HistoryEra) {
    this.era = era
    this.group.scale.setScalar(
      era === "early" ? 0.9 : era === "peak" ? 1.3 : 1.0
    )
  }

  update(dt: number) {
    this.pulse += dt
    this.group.position.y =
      Math.sin(this.pulse * 0.6) * 0.03
  }
}