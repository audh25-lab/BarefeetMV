import * as THREE from "three"

/* =========================
   LEARNING / USER STATE
========================= */

export type LearnerProfileState = {
  age: number
  curiosity: number
  mastery: number
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
          lastActive: Date.now()
        }
  }

  update(event: "learn" | "play" | "rest") {
    if (event === "learn") {
      this.state.curiosity += 0.05
      this.state.mastery += 0.02
    }
    if (event === "play") {
      this.state.curiosity += 0.02
    }

    this.state.lastActive = Date.now()
    localStorage.setItem(this.key, JSON.stringify(this.state))
  }
}

/* =========================
   COMPANION AVATAR (3D)
========================= */

export class CompanionAvatar3D {
  mesh: THREE.Mesh
  mood = 0.5

  constructor(name: string) {
    const geo = new THREE.SphereGeometry(0.35, 32, 32)
    const mat = new THREE.MeshStandardMaterial({
      color: "#00e5ff",
      emissive: "#00aacc",
      emissiveIntensity: 0.5
    })
    this.mesh = new THREE.Mesh(geo, mat)
    this.mesh.position.set(0, 1.4, 0)
  }

  react(intent: "explore" | "play" | "rest") {
    if (intent === "explore") this.mood += 0.05
    if (intent === "rest") this.mood -= 0.05
  }

  update(dt: number) {
    this.mesh.position.y =
      1.4 + Math.sin(Date.now() / 600) * 0.05

    ;(this.mesh.material as THREE.MeshStandardMaterial).emissiveIntensity =
      0.3 + this.mood * 0.4
  }
}

/* =========================
   MALDIVES OCEAN SHADER
========================= */

export class MaldivesOcean {
  mesh: THREE.Mesh
  time = 0

  constructor() {
    const geo = new THREE.PlaneGeometry(50, 50, 128, 128)

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
          pos.z += sin(pos.x * 0.4 + time) * 0.15;
          pos.z += cos(pos.y * 0.4 + time) * 0.15;
          gl_Position = projectionMatrix * modelViewMatrix * vec4(pos,1.0);
        }
      `,
      fragmentShader: `
        varying vec2 vUv;
        void main() {
          vec3 water = mix(
            vec3(0.0, 0.6, 0.7),
            vec3(0.0, 0.3, 0.5),
            vUv.y
          );
          gl_FragColor = vec4(water, 1.0);
        }
      `
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
      new THREE.CylinderGeometry(0.2, 0.25, 2, 16),
      new THREE.MeshStandardMaterial({ color: "#e0d8c3" })
    )
    column.position.set(2, 1, -2)
    scene.add(column)
  }
}

export class ChinaScene {
  static build(scene: THREE.Scene) {
    const gate = new THREE.Mesh(
      new THREE.BoxGeometry(2, 1, 0.3),
      new THREE.MeshStandardMaterial({ color: "#aa3333" })
    )
    gate.position.set(-2, 1, -2)
    scene.add(gate)
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

  constructor(container: HTMLElement) {
    /* Camera */
    this.camera = new THREE.PerspectiveCamera(
      60,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    )
    this.camera.position.set(0, 2.2, 6)

    /* Renderer */
    this.renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true
    })
    this.renderer.setSize(window.innerWidth, window.innerHeight)
    container.appendChild(this.renderer.domElement)

    /* Lighting */
    const sun = new THREE.DirectionalLight("#ffffff", 1.1)
    sun.position.set(5, 10, 5)
    this.scene.add(sun)

    const ambient = new THREE.AmbientLight("#88ccee", 0.5)
    this.scene.add(ambient)

    /* Systems */
    this.learner = new LearnerProfile()
    this.companion = new CompanionAvatar3D("Kai")
    this.ocean = new MaldivesOcean()

    this.scene.add(this.ocean.mesh)
    this.scene.add(this.companion.mesh)

    /* History Packs */
    RomanScene.build(this.scene)
    ChinaScene.build(this.scene)

    this.animate()
  }

  handleIntent(intent: "explore" | "play" | "rest") {
    this.companion.react(intent)
    this.learner.update(
      intent === "rest" ? "rest" : "learn"
    )
  }

  animate = () => {
    requestAnimationFrame(this.animate)

    const dt = this.clock.getDelta()

    this.companion.update(dt)
    this.ocean.update(dt)

    this.renderer.render(this.scene, this.camera)
  }
}