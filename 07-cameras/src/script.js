import './style.css'
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
console.log(OrbitControls)
/**
 * Cursor
 */
const cursor = {
    x: 0,
    y: 0
}

window.addEventListener('mousemove', (event)=>{
    // console.log(event.clientX, event.clientY)

    cursor.x = event.clientX / sizes.width -0.5
    cursor.y = -(event.clientY / sizes.height -0.5)
    // cursor.x = event.clientX - (sizes.width/2)
    // const newCursorX = cursorX / sizes.width
    // console.log(cursor.x, cursor.y)
})

/**
 * Base
 */
// Canvas
const canvas = document.querySelector('canvas.webgl')

// Sizes
const sizes = {
    width: 800,
    height: 600
}

// Scene
const scene = new THREE.Scene()

// Object
const mesh = new THREE.Mesh(
    new THREE.BoxGeometry(1, 1, 1, 5, 5, 5),
    new THREE.MeshBasicMaterial({ color: 0xff0000 })
)
scene.add(mesh)

// Camera
//perspectiveCamera 1. field of view 2. aspect ratio 3. near ( 0보다 크고 far보다 작음/ 0.1이 default) 4. far (near보다 큼 /2000이 default)
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 1000)

//orthographicCamera1
// const aspectRatio = sizes.width / sizes.height
// console.log(aspectRatio)
// const aspectRatio2 = sizes.height / sizes.width
// const camera = new THREE.OrthographicCamera(
//     -1*aspectRatio,
//      1*aspectRatio, 
//      1, 
//      -1, 
//      0.1, 
//      2000)

//orthographicCamera2
// const camera = new THREE.OrthographicCamera(
//         -1,
//          1, 
//          1*aspectRatio2, 
//          -1*aspectRatio2, 
//          0.1, 
//          2000)

// camera.position.x = 2
// camera.position.y = 2
camera.position.z = 3
camera.lookAt(mesh.position)
scene.add(camera)

console.log(mesh.position.length())
console.log(camera.position.length())
console.log(mesh.position.distanceTo(camera.position))

//Controls
const controls = new OrbitControls(camera, canvas)
controls.enableDamping = true
// controls.target.y =2
// controls.update()

// Renderer
const renderer = new THREE.WebGLRenderer({
    canvas: canvas
})
renderer.setSize(sizes.width, sizes.height)

// Animate
const clock = new THREE.Clock()
console.log(clock)
const tick = () =>
{
    const elapsedTime = clock.getElapsedTime()
    // console.log(elapsedTime)

    // Update objects
    // mesh.rotation.y = elapsedTime;

    //Update camera
    // camera.position.x = cursor.x * 10
    // camera.position.y = cursor.y * 5
    // camera.position.x = Math.sin(cursor.x *Math.PI*2) *3
    // camera.position.z = Math.cos(cursor.x *Math.PI*2) *3


    // camera.lookAt(new THREE.Vector3())
    // camera.lookAt(mesh.position)

    //Update controls
    controls.update()

    // Render
    renderer.render(scene, camera)

    // Call tick again on the next frame
    window.requestAnimationFrame(tick)
}

tick()
