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

/**
 * Object
 */
const geometry = new THREE.BoxGeometry(1, 1, 1)
const material = new THREE.MeshBasicMaterial({ color: 0xff0000 })
const mesh = new THREE.Mesh(geometry, material)
scene.add(mesh)

/**
 * Sizes 배열임
 */
const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
}
// function a(){
//     return 
// }
/**
 * Resize
 */
window.addEventListener('resize', ()=>{
    console.log('window has been resized')

    //width, height 들어간 거 모두
    //Update sizes
    sizes.width = window.innerWidth;
    sizes.height = window.innerHeight;

    //Update camera
    camera.aspect = sizes.width / sizes.height
    camera.updateProjectionMatrix()

    //Update renderer
    renderer.setSize(sizes.width, sizes.height)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))


})

window.addEventListener('dblclick', ()=>{
    const fullscreenElement = document.fullscreenElement || document.webkitRequestFllscreen
    console.log('double click')
    if(!document.fullscreenElement){
        console.log('go fullscreen')
        canvas.requestFullscreen()
        //사파리
        // if(canvas.requestFullscreen){
        //     canvas.requestFullscreen
        // }else if(canvas.webkitRequestFllscreen){
        //     canvas.webkitRequestFllscreen
        // }
    }else{
        console.log('leave fullscreen')
        document.exitFullscreen()
        // 사파리
        // if(document.exitFullscreen){
        //     document.exitFullscreen()
        // }else if(document.webkitExitFullscreen){
        //     document.webkitExitFullscreen()
        // }
    }
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
// controls.enabled = false
controls.enableDamping = true

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
    canvas: canvas
})
renderer.setSize(sizes.width, sizes.height)

/**
 * Pixel ratio
 */
// renderer.setPixelRatio(window.devicePixelRatio)
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