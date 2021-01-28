import './style.css'
import * as THREE from 'three'
import gsap from 'gsap'

console.log(gsap)

// Canvas
const canvas = document.querySelector('canvas.webgl')

// Scene
const scene = new THREE.Scene()

// Object
const geometry = new THREE.BoxGeometry(1, 1, 1)
const material = new THREE.MeshBasicMaterial({ color: 0xff0000 })
const mesh = new THREE.Mesh(geometry, material)
scene.add(mesh)

// Sizes
const sizes = {
    width: 800,
    height: 600
}

// Camera
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height)
camera.position.z = 3
scene.add(camera)

// Renderer
const renderer = new THREE.WebGLRenderer({
    canvas: canvas
})
renderer.setSize(sizes.width, sizes.height)

//Time
let time = Date.now()

//Animations
// const tick = () =>{
//     console.log('tick')

//     const currentTime = Date.now()
//     const deltaTime = currentTime - time
//     time = currentTime

//     console.log(deltaTime)

//     //Update objects
//     // mesh.position.x += 0.002
//     // mesh.rotation.y += 0.01
//     mesh.rotation.y += 0.002 * deltaTime

//     //render
//     renderer.render(scene, camera)

//     //call it on the next frame!
//     window.requestAnimationFrame(tick)
// }

// tick()


// const clock = new THREE.Clock()

// const tick = () =>{
//     const elapsedTime = clock.getElapsedTime()
//     // console.log(elapsedTime)

//     // mesh.rotation.y = elapsedTime * Math.PI 
//     // mesh.rotation.x = Math.cos(elapsedTime)
//     // mesh.rotation.y = Math.sin(elapsedTime)
//     // mesh.position.x = Math.cos(elapsedTime)
//     // mesh.position.y = Math.sin(elapsedTime)

//     camera.position.x = Math.cos(elapsedTime)
//     camera.position.y = Math.sin(elapsedTime)
//     camera.lookAt(mesh.position)

//     renderer.render(scene, camera)

//     window.requestAnimationFrame(tick)

// }
// tick()

gsap.to(mesh.position, {x: 2, duration: 1, delay: 1})

const tick = () =>{
    renderer.render(scene, camera)
    window.requestAnimationFrame(tick)
}
tick()
