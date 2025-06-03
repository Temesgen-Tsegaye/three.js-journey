import "./style.css"

import * as THREE from "three"

const scene = new THREE.Scene()

const canvas = document.querySelector("canvas")
console.log({ canvas })
const geometry = new THREE.BoxGeometry(2, 2, 2)
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
renderer.render(scene, camera)
