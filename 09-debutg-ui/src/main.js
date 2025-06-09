import "./style.css"
import "./style.css"
import "./style.css"

import * as THREE from "three"
import GUI from "lil-gui"
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js"
import gsap from "gsap"
const gui = new GUI()
const scene = new THREE.Scene()

const canvas = document.querySelector("canvas")
console.log({ canvas })

const geometry = new THREE.BufferGeometry()

const count = 50
const positionsArray = new Float32Array(count * 3 * 3)
for (let i = 0; i < count * 3 * 3; i++) {
  positionsArray[i] = (Math.random() - 0.5) * 4
}
const buffrAttr = new THREE.BufferAttribute(positionsArray, 3)
geometry.setAttribute("position", buffrAttr)
// const geometry = new THREE.BoxGeometry(1, 1, 1, 2, 2, 2)
const material = new THREE.MeshBasicMaterial({
  color: "red",
  wireframe: true,
})

const debugObj = {
  spin: () =>
    gsap.to(mesh.rotation, { duration: 2, y: mesh.rotation.y + 2 * 3.14 }),
}
const mesh = new THREE.Mesh(geometry, material)
gui.add(mesh.position, "y", -3, 3, 0.2)
gui.add(material, "wireframe")
gui.addColor(material, "color")
gui.add(debugObj, "spin")
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
