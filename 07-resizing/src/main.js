import "./style.css"

import * as THREE from "three"
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js"
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
  height: window.innerHeight,
  width: window.innerWidth,
}
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height)
camera.position.z = 3
scene.add(camera)
console.log({ scene })
const renderer = new THREE.WebGLRenderer({ canvas: canvas })
const cursor = {
  x: 0,
  y: 0,
}
window.addEventListener("mousemove", (event) => {
  cursor.x = (event.clientX / sizes.width - 0.5) * 5
  cursor.y = -(event.clientY / sizes.height - 0.5) * 5

  console.log(cursor.x, event.clientX)
})

const controls = new OrbitControls(camera, canvas)
controls.target.add(mesh.position)

window.addEventListener("resize", () => {
  // Update sizes
  sizes.width = window.innerWidth
  sizes.height = window.innerHeight

  // Update camera
  camera.aspect = sizes.width / sizes.height
  camera.updateProjectionMatrix()

  // Update renderer
  renderer.setSize(sizes.width, sizes.height)
})
controls.enableDamping = true
renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
function tick() {
  // camera.position.x = cursor.x
  // camera.position.y = cursor.y

  // Update camera
  // camera.position.x = Math.sin(cursor.x * Math.PI * 2) * 2
  // camera.position.z = Math.cos(cursor.x * Math.PI * 2) * 2
  // camera.position.y = cursor.y * 3
  // camera.lookAt(mesh.position)
  controls.update()
  renderer.render(scene, camera)

  window.requestAnimationFrame(tick)
}
tick()
