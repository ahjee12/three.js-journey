import './style.css'
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import gsap from 'gsap'
import * as dat from 'dat.gui'

console.log(dat)

/**
 * Debug
 */
// const gui = new dat.GUI()
const gui = new dat.GUI({closed: true, width: 400})

const parameters = {
    color: '#ff0000',
    spin: ()=>{
        console.log('spin')
        // gsap.to(mesh.rotation, {y: 10, duration: 1})
        gsap.to(mesh.rotation, {y: mesh.rotation.y + Math.PI *2, duration: 1})
    }
}

/**
 * Base
 */
// Canvas
const canvas = document.querySelector('canvas.webgl')

// Scene
const scene = new THREE.Scene()

/**
 * Object
 */
const geometry = new THREE.BoxBufferGeometry(1, 1, 1)
//parameter컬러 바꿀 때 씬에 들어가는 시작 컬러도 자동으로 바뀌도록
const material = new THREE.MeshBasicMaterial({ color:  parameters.color})
const mesh = new THREE.Mesh(geometry, material)
scene.add(mesh)

/**
 * GUI
 */
//H: hide or gui.hide()

// gui.add(mesh.position, 'y', -3, 3, 0.01)
gui.add(mesh.position, 'y').min(-3).max(3).step(0.01).name('elevation')
// gui.add(mesh.position, 'x', -3, 3, 0.01)
// gui.add(mesh.position, 'z', -3, 3, 0.01)

//gui가 boolean인 줄 앎
gui.add(mesh, 'visible')

gui.add(material, 'wireframe')

//parameter따로 정해야 할 경우
console.log(material.color)
gui.addColor(parameters, 'color')
    .onChange(()=>{
        material.color.set(parameters.color)
    })

gui.add(parameters, 'spin')
/**
 * Sizes
 */
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

/**
 * Camera
 */
// Base camera
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 100)
camera.position.z = 3
scene.add(camera)

// Controls
const controls = new OrbitControls(camera, canvas)
controls.enableDamping = true

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
    canvas: canvas
})
renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

/**
 * Animate
 */
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