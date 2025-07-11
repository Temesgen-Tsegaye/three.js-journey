import * as THREE from "three"
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js"
import GUI from "lil-gui"
import { RGBELoader } from "three/examples/jsm/loaders/RGBELoader.js"
const gui = new GUI()
/**
 * Base
 */
// Canvas
const canvas = document.querySelector("canvas.webgl")

// Scene
const scene = new THREE.Scene()
// MeshBasicMaterial

const textureLoader = new THREE.TextureLoader()

const doorColorTexture = textureLoader.load("./textures/door/color.jpg")
const doorAlphaTexture = textureLoader.load("./textures/door/alpha.jpg")
const doorAmbientOcclusionTexture = textureLoader.load(
  "./textures/door/ambientOcclusion.jpg"
)
const doorHeightTexture = textureLoader.load("./textures/door/height.jpg")
const doorNormalTexture = textureLoader.load("./textures/door/normal.jpg")
const doorMetalnessTexture = textureLoader.load("./textures/door/metalness.jpg")
const doorRoughnessTexture = textureLoader.load("./textures/door/roughness.jpg")
const matcapTexture = textureLoader.load("./textures/matcaps/1.png")
const gradientTexture = textureLoader.load("./textures/gradients/3.jpg")

doorColorTexture.colorSpace = THREE.SRGBColorSpace
matcapTexture.colorSpace = THREE.SRGBColorSpace
// const material = new THREE.MeshBasicMaterial({ map: doorColorTexture })
// material.transparent = true //this must be set for opacity to take effect
// material.opacity = 0.5
// material.alphaMap = doorAlphaTexture
// material.side = THREE.DoubleSide
const material = new THREE.MeshStandardMaterial()

material.roughness = 0.45
material.metalness = 0.45
material.map = doorColorTexture
gui.add(material, "metalness").min(0).max(1).step(0.0001)
gui.add(material, "roughness").min(0).max(1).step(0.0001)
const sphere = new THREE.Mesh(new THREE.SphereGeometry(0.5, 16, 16), material)
sphere.position.x = -1.5

const plane = new THREE.Mesh(new THREE.PlaneGeometry(1, 1), material)

const torus = new THREE.Mesh(
  new THREE.TorusGeometry(0.3, 0.2, 16, 32),
  material
)
torus.position.x = 1.5

scene.add(sphere, plane, torus)
// const ambientLight = new THREE.AmbientLight(0xffffff, 1)
// scene.add(ambientLight)
// const pointLight = new THREE.PointLight(0xffffff, 30)
// pointLight.position.x = 2
// pointLight.position.y = 3
// pointLight.position.z = 4
// scene.add(pointLight)

const rgbeloader = new RGBELoader()

rgbeloader.load("./textures/environmentMap/2k.hdr", (environment) => {
  environment.mapping = THREE.EquirectangularReflectionMapping
  scene.background = environment
  scene.environment = environment
})
/**
 * Sizes
 */
const sizes = {
  width: window.innerWidth,
  height: window.innerHeight,
}

window.addEventListener("resize", () => {
  // Update sizes
  sizes.width = window.innerWidth
  sizes.height = window.innerHeight

  // Update camera
  camera.aspect = sizes.width / sizes.height
  camera.updateProjectionMatrix()

  // Update renderer
  renderer.setSize(sizes.width, sizes.height)
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
})

/**
 * Camera
 */
// Base camera
const camera = new THREE.PerspectiveCamera(
  75,
  sizes.width / sizes.height,
  0.1,
  100
)
camera.position.x = 1
camera.position.y = 1
camera.position.z = 2
scene.add(camera)

// Controls
const controls = new OrbitControls(camera, canvas)
controls.enableDamping = true

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
  canvas: canvas,
})
renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

/**
 * Animate
 */
const clock = new THREE.Clock()

const tick = () => {
  const elapsedTime = clock.getElapsedTime()

  sphere.rotation.y = 0.1 * elapsedTime
  plane.rotation.y = 0.1 * elapsedTime
  torus.rotation.y = 0.1 * elapsedTime

  sphere.rotation.x = -0.15 * elapsedTime
  plane.rotation.x = -0.15 * elapsedTime
  torus.rotation.x = -0.15 * elapsedTime
  // Update controls
  controls.update()

  // Render
  renderer.render(scene, camera)

  // Call tick again on the next frame
  window.requestAnimationFrame(tick)
}

tick()

//TODO
//COLOR SPACE
//ALPHA MAP
//MESH NORMAL MATERIAL
//MeshMatcapMaterial
//MATCAP
//Mesh lambert
//Meshphong material
//Meshtoon material
//Mesh standard
//enviroment maps in depth
//MeshLambert and MeshPhoneMaterial,MeshPhysicalMaterial
//hoe to make textures material ,texture
