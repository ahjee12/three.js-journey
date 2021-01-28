import './style.css'
import * as THREE from 'three'

// Canvas
const canvas = document.querySelector('canvas.webgl')

// Scene
const scene = new THREE.Scene()

/**
 * Objects
 */
const geometry = new THREE.BoxGeometry(1, 1, 1)
const material = new THREE.MeshBasicMaterial({ color: 0xff0000 })
const mesh = new THREE.Mesh(geometry, material)

/**
 * position
 */
// mesh.position.z = 1
// mesh.position.x = 0.7
// mesh.position.y = 1
mesh.position.set(0.7, 1, 1)

/**
 * Scale
 */
// mesh.scale.x = 1
// mesh.scale.y = 0.5
// mesh.scale.z = 0.5
mesh.scale.set(1, 0.5, 0.5)

/**
 * Rotation
 */
mesh.rotation.reorder('YXZ')
mesh.rotation.x = Math.PI/3
// mesh.rotation.y = Math.PI/2

scene.add(mesh)

// mesh.position.normalize()

//object mesh 와 중앙 사이 거리
console.log(mesh.position.length())

/**
 * Group
 */
const group = new THREE.Group()
scene.add(group)

const cube1 = new THREE.Mesh(
    new THREE.BoxGeometry(1,1,1),
    new THREE.MeshBasicMaterial({color: 0xff0000})
)
group.add(cube1)
const cube2 = new THREE.Mesh(
    new THREE.BoxGeometry(1,1,1),
    new THREE.MeshBasicMaterial({color: 0xfff000})
)
cube2.position.x = -2
group.add(cube2)
const cube3 = new THREE.Mesh(
    new THREE.BoxGeometry(1,1,1),
    new THREE.MeshBasicMaterial({color: 0xffb000})
)
cube3.position.x = 2

group.position.y = 2
group.scale.y = 2
group.rotation.y = 0.5
group.add(cube3)



//green is Y red is X blue is Z
const axesHelper = new THREE.AxesHelper(3)
scene.add(axesHelper)

/**
 * Sizes
 */
const sizes = {
    width: 800,
    height: 600
}

/**
 * Camera
 */
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height)
camera.position.z = 3
// camera.position.x = 1
camera.position.y = 1
scene.add(camera)

// camera.lookAt(new THREE.Vector3(0,0,0))
// camera.lookAt(mesh.position) 안 됨

//object mesh 와 카메라 사이 거리
console.log(mesh.position.distanceTo(camera.position))

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
    canvas: canvas
})
renderer.setSize(sizes.width, sizes.height)
renderer.render(scene, camera)