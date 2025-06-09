import "./style.css"
import door from "/textures/door/color.jpg"
import * as THREE from "three"
import GUI from "lil-gui"
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js"
import gsap from "gsap"
const gui = new GUI()
const scene = new THREE.Scene()

const canvas = document.querySelector("canvas")
console.log({ canvas })

// let image = new Image()
// const texture = new THREE.Texture(image)
// texture.colorSpace = THREE.SRGBColorSpace
// image.addEventListener("load", () => {
//   texture.needsUpdate = true
// })

// image.src = door
let texture = new THREE.Texture()

const loadingManager = new THREE.LoadingManager()
const textureLoader = new THREE.TextureLoader(loadingManager)

loadingManager.onStart = () => {
  console.log("loading started")
}
loadingManager.onLoad = () => {
  console.log("loading finished")
}
loadingManager.onProgress = () => {
  console.log("loading progressing")
}
loadingManager.onError = () => {
  console.log("loading error")
}

texture = textureLoader.load(door)
texture.colorSpace = THREE.SRGBColorSpace
// texture.wrapS = THREE.RepeatWrapping
texture.wrapT = THREE.RepeatWrapping
texture.wrapS = THREE.MirroredRepeatWrapping
// texture.wrapT = THREE.MirroredRepeatWrapping
// texture.repeat.x = 2
// texture.repeat.y = 3

// texture.offset.x = 0.5
// texture.offset.y =0.5
texture.rotation = Math.PI * 0.25
texture.center.x = 0.5
texture.center.y = 0.5
const alphaTexture = textureLoader.load("/textures/door/alpha.jpg")
const heightTexture = textureLoader.load("/textures/door/height.jpg")
const normalTexture = textureLoader.load("/textures/door/normal.jpg")
const ambientOcclusionTexture = textureLoader.load(
  "/textures/door/ambientOcclusion.jpg"
)
const metalnessTexture = textureLoader.load("/textures/door/metalness.jpg")
const roughnessTexture = textureLoader.load("/textures/door/roughness.jpg")
const geometry = new THREE.BoxGeometry(2, 2, 2, 2, 2, 2)
const material = new THREE.MeshBasicMaterial({
  map: texture,
  // color: "red",
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

//TODO
//Filtering and Mipmapping
