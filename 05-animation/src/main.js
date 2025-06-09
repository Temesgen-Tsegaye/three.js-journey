import "./style.css"

import * as THREE from "three"
import gsap from "gsap"
const scene = new THREE.Scene()

const canvas = document.querySelector("canvas")
console.log({ canvas })
const geometry = new THREE.BoxGeometry(1, 1, 1)
const material = new THREE.MeshBasicMaterial({
  color: "red",
})
const mesh = new THREE.Mesh(geometry, material)
scene.add(mesh)
const sizes = {
  height: 600,
  width: 800,
}
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height)
camera.position.z = 3
scene.add(camera)
console.log({ scene })
const renderer = new THREE.WebGLRenderer({ canvas: canvas })

renderer.setSize(sizes.width, sizes.height)

const clock = new THREE.Clock()

gsap.to(mesh.position, { x: 5, duration: 2, delay: 1 })
function tick() {
  // mesh.rotation.y = clock.getElapsedTime()
  // mesh.position.x = Math.cos(clock.getElapsedTime())
  // mesh.position.y = Math.sin(clock.getElapsedTime())
  renderer.render(scene, camera)

  window.requestAnimationFrame(tick)
}
tick()
