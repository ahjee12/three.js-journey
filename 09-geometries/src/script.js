import './style.css'
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'

/**
 * Base
 */
// Canvas
const canvas = document.querySelector('canvas.webgl')

// Scene
const scene = new THREE.Scene()

// Object
// width, height, depth, widthSegments, heightSegments, depthSegments
// const geometry = new THREE.BoxBufferGeometry(1, 1, 1, 2, 2, 2)

/**
 * Float
 */
// const positionArray = new Float32Array(9)

// positionsArray[0] = 0
// positionsArray[1] = 0
// positionsArray[2] = 0

// positionsArray[3] = 0
// positionsArray[4] = 1
// positionsArray[5] = 0

// positionsArray[6] = 1
// positionsArray[7] = 0
// positionsArray[8] = 0

/**
 * PositionArray PositionAttribute
 */
// const positionArray = new Float32Array([
//     0,0,0,
//     0,1,0,
//     1,0,0
// ])
// const positionAttribute = new THREE.BufferAttribute(positionArray, 3)
// const geometry = new THREE.BufferGeometry()
// //☆position is the name that will be used in the shader
// geometry.setAttribute('position', positionAttribute)

/**
 * Random triangles
 */
const geometry = new THREE.BufferGeometry()

const count = 100
const positionArray = new Float32Array(count * 3 * 3)
for(let i =0; i< count*3*3; i++){
    positionArray[i] = (Math.random() -0.5)*4
}
//how much values the program's supposed to take 삼각형 만들거니까 3개에서 끊기
const positionAttribute = new THREE.BufferAttribute(positionArray, 3)
geometry.setAttribute('position', positionAttribute)



// const geometry = new THREE.Geometry()

// const vertex1 = new THREE.Vector3(0, 0, 0)
// geometry.vertices.push(vertex1)
// const vertex2 = new THREE.Vector3(0, 1, 0)
// geometry.vertices.push(vertex2)
// const vertex3 = new THREE.Vector3(1, 0, 0)
// geometry.vertices.push(vertex3)

/**
 * Random triangles
 */
// for(let i=0; i<50; i++){
//     for(let j=0; j<3; j++){
//         const vertices = new THREE.Vector3((Math.random()-0.5)*4, (Math.random()-0.5)*4, (Math.random()-0.5)*4)
//         geometry.vertices.push(vertices)
//     }

//     const verticesIndex = i*3
//     //0 1 2, 3 4 5, 6 7 8, 9 10 11
//     const face = new THREE.Face3(verticesIndex, verticesIndex+1, verticesIndex+3)
//     geometry.faces.push(face)
// }

// const face = new THREE.Face3(0, 1, 2)
// geometry.faces.push(face)

const material = new THREE.MeshBasicMaterial({ 
    color: 0xff0000,
    wireframe: true
})
const mesh = new THREE.Mesh(geometry, material)
scene.add(mesh)

// Sizes
const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
}

window.addEventListener('resize', () =>
{
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

// Camera
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 100)
camera.position.z = 3
scene.add(camera)

// Controls
const controls = new OrbitControls(camera, canvas)
controls.enableDamping = true

// Renderer
const renderer = new THREE.WebGLRenderer({
    canvas: canvas
})
renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

// Animate
const clock = new THREE.Clock()

const tick = () =>
{
    const elapsedTime = clock.getElapsedTime()

    // Update controls
    controls.update()

    // Render
    renderer.render(scene, camera)

    // Call tick again on the next frame
    window.requestAnimationFrame(tick)
}

tick()