import * as THREE from "three"

/* =========================
   LEARNING / USER STATE
========================= */

export type LearnerProfileState = {
  age: number
  curiosity: number
  mastery: number
  joy: number
  lastActive: number
}

export class LearnerProfile {
  private key = "barefeetmv:learner"
  state: LearnerProfileState

  constructor() {
    const saved =
      typeof window !== "undefined"
        ? localStorage.getItem(this.key)
        : null

    this.state = saved
      ? JSON.parse(saved)
      : {
          age: 6,
          curiosity: 0.5,
          mastery: 0.1,
          joy: 0.7,
          lastActive: Date.now()
        }
  }

  update(event: "learn" | "play" | "rest" | "explore") {
    if (event === "learn") {
      this.state.curiosity += 0.05
      this.state.mastery += 0.03
    }
    if (event === "play") this.state.joy += 0.05
    if (event === "explore") this.state.curiosity += 0.04

    this.state.lastActive = Date.now()
    localStorage.setItem(this.key, JSON.stringify(this.state))
  }
}

/* =========================
   COMPANION AVATAR (3D)
========================= */

export type CompanionEmotion =
  | "calm"
  | "happy"
  | "curious"
  | "focused"

export class CompanionAvatar3D {
  mesh: THREE.Mesh
  emotion: CompanionEmotion = "calm"

  constructor(name: string) {
    const geo = new THREE.SphereGeometry(0.35, 32, 32)
    const mat = new THREE.MeshStandardMaterial({
      color: "#00e5ff",
      emissive: "#004466",
      emissiveIntensity: 0.6
    })
    this.mesh = new THREE.Mesh(geo, mat)
    this.mesh.position.set(0, 1.4, 0)
  }

  react(intent: "explore" | "play" | "rest" | "learn") {
    if (intent === "explore") this.emotion = "curious"
    if (intent === "play") this.emotion = "happy"
    if (intent === "learn") this.emotion = "focused"
    if (intent === "rest") this.emotion = "calm"

    const mat = this.mesh.material as THREE.MeshStandardMaterial

    if (this.emotion === "happy") mat.emissiveIntensity = 1
    if (this.emotion === "curious") mat.color.set("#00ffcc")
    if (this.emotion === "focused") mat.color.set("#88ccff")
    if (this.emotion === "calm") mat.emissiveIntensity = 0.4
  }

  update(dt: number) {
    this.mesh.position.y =
      1.4 + Math.sin(performance.now() * 0.002) * 0.05
  }
}

/* =========================
   MALDIVES OCEAN SHADER
========================= */

export class MaldivesOcean {
  mesh: THREE.Mesh
  time = 0

  constructor() {
    const geo = new THREE.PlaneGeometry(80, 80, 256, 256)

    const mat = new THREE.ShaderMaterial({
      uniforms: {
        time: { value: 0 }
      },
      vertexShader: `
        uniform float time;
        varying vec2 vUv;
        void main() {
          vUv = uv;
          vec3 pos = position;
          pos.z += sin(pos.x * 0.2 + time) * 0.25;
          pos.z += cos(pos.y * 0.25 + time * 1.3) * 0.25;
          gl_Position = projectionMatrix * modelViewMatrix * vec4(pos,1.0);
        }
      `,
      fragmentShader: `
        varying vec2 vUv;
        void main() {
          vec3 shallow = vec3(0.0, 0.7, 0.8);
          vec3 deep = vec3(0.0, 0.3, 0.5);
          vec3 water = mix(shallow, deep, vUv.y);
          gl_FragColor = vec4(water, 1.0);
        }
      `,
      side: THREE.DoubleSide
    })

    this.mesh = new THREE.Mesh(geo, mat)
    this.mesh.rotation.x = -Math.PI / 2
  }

  update(dt: number) {
    this.time += dt
    ;(this.mesh.material as THREE.ShaderMaterial).uniforms.time.value =
      this.time
  }
}

/* =========================
   HISTORY SCENE PACKS
========================= */

export class RomanScene {
  static build(scene: THREE.Scene) {
    const column = new THREE.Mesh(
      new THREE.CylinderGeometry(0.3, 0.35, 3, 20),
      new THREE.MeshStandardMaterial({ color: "#e0d8c3" })
    )
    column.position.set(2, 1.5, -3)
    scene.add(column)
  }
}

export class ChinaScene {
  static build(scene: THREE.Scene) {
    const gate = new THREE.Mesh(
      new THREE.BoxGeometry(2.5, 1.2, 0.4),
      new THREE.MeshStandardMaterial({ color: "#aa3333" })
    )
    gate.position.set(-2, 1.2, -3)
    scene.add(gate)
  }
}

/* =========================
   HISTORY PORTAL
========================= */

class HistoryPortal {
  mesh: THREE.Mesh
  target: "roman" | "china"

  constructor(target: "roman" | "china", x: number) {
    this.target = target
    this.mesh = new THREE.Mesh(
      new THREE.RingGeometry(0.5, 0.7, 32),
      new THREE.MeshStandardMaterial({
        color: "#ffd700",
        emissive: "#ffaa00",
        emissiveIntensity: 1
      })
    )
    this.mesh.position.set(x, 1.4, -2)
  }
}

/* =========================
   WORLD ENGINE (CORE)
========================= */

export class WorldEngine {
  scene = new THREE.Scene()
  camera: THREE.PerspectiveCamera
  renderer: THREE.WebGLRenderer
  clock = new THREE.Clock()

  learner: LearnerProfile
  companion: CompanionAvatar3D
  ocean: MaldivesOcean
  portals: HistoryPortal[] = []

  constructor(container: HTMLElement) {
    this.camera = new THREE.PerspectiveCamera(
      60,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    )
    this.camera.position.set(0, 2.2, 6)

    this.renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true
    })
    this.renderer.setSize(window.innerWidth, window.innerHeight)
    container.appendChild(this.renderer.domElement)

    const sun = new THREE.DirectionalLight("#ffffff", 1.1)
    sun.position.set(5, 10, 5)
    this.scene.add(
      sun,
      new THREE.AmbientLight("#88ccee", 0.5)
    )

    this.learner = new LearnerProfile()
    this.companion = new CompanionAvatar3D("Kai")
    this.ocean = new MaldivesOcean()

    this.scene.add(this.ocean.mesh, this.companion.mesh)

    RomanScene.build(this.scene)
    ChinaScene.build(this.scene)

    this.portals.push(
      new HistoryPortal("roman", -1.5),
      new HistoryPortal("china", 1.5)
    )

    this.portals.forEach(p => this.scene.add(p.mesh))

    this.animate()
  }

  handleIntent(intent: "explore" | "play" | "rest" | "learn") {
    this.companion.react(intent)
    this.learner.update(intent)
  }

  animate = () => {
    requestAnimationFrame(this.animate)

    const dt = this.clock.getDelta()
    this.ocean.update(dt)
    this.companion.update(dt)

    this.renderer.render(this.scene, this.camera)
  }
}