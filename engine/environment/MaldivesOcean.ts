import * as THREE from "three"

export class MaldivesOcean {
  mesh: THREE.Mesh
  uniforms: any

  constructor() {
    this.uniforms = {
      time: { value: 0 },
      colorDeep: { value: new THREE.Color("#003f5c") },
      colorShallow: { value: new THREE.Color("#00e5ff") }
    }

    const geometry = new THREE.PlaneGeometry(200, 200, 256, 256)

    const material = new THREE.ShaderMaterial({
      uniforms: this.uniforms,
      vertexShader: `
        uniform float time;
        varying vec2 vUv;

        void main() {
          vUv = uv;
          vec3 pos = position;
          pos.z += sin(pos.x * 0.1 + time) * 0.3;
          pos.z += sin(pos.y * 0.15 + time * 1.5) * 0.2;
          gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
        }
      `,
      fragmentShader: `
        uniform vec3 colorDeep;
        uniform vec3 colorShallow;
        varying vec2 vUv;

        void main() {
          float depth = vUv.y;
          vec3 color = mix(colorShallow, colorDeep, depth);
          gl_FragColor = vec4(color, 1.0);
        }
      `,
      side: THREE.DoubleSide
    })

    this.mesh = new THREE.Mesh(geometry, material)
    this.mesh.rotation.x = -Math.PI / 2
  }

  update(dt: number) {
    this.uniforms.time.value += dt
  }
}