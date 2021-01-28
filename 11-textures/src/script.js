import './style.css'
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
//img는 src or static폴더에서 가져올 수 있음
// import imageSource from './color.jpg'
// console.log(imageSource);


/**
 * Textures javascript
 */
// const image = new Image()
// const texture = new THREE.Texture(image)

// image.onload = () =>{
//     //☆아래 texture는 함수 안에 선언됐기 때문에 밖에서 못 씀!☆
//     // const texture = new THREE.Texture(image)
//     //☆ needsUpdate = true or ☆
//     texture.needsUpdate = true
//     console.log(texture);
//     console.log('image loaded')

// }
// image.src = '/textures/door/color.jpg'

/**
 * TextureLoader
 */
// const textureLoader = new THREE.TextureLoader()
// const texture = textureLoader.load('/textures/door/color.jpg',
//     () =>{
//         console.log('load')
//     },
//     () =>{
//         console.log('progress');
//     },
//     () =>{
//         console.log('error');

//     }
// )


/**
 * Loading Magager
 */

const loaderManager = new THREE.LoadingManager()

// loaderManager.onStart = () =>{
//     console.log('onLoaded');
// }
// loaderManager.onProgress = () =>{
//     console.log('onProgress');
// }
// loaderManager.onError = () =>{
//     console.log('onError');
// }
const textureLoader = new THREE.TextureLoader(loaderManager)
// const colorTexture = textureLoader.load('/textures/checkerboard-8x8.png')
const colorTexture = textureLoader.load('/textures/minecraft.png')
const normalTexture = textureLoader.load('/textures/door/normal.jpg')
const alphaTexture = textureLoader.load('/textures/door/alpha.jpg')
const heightTexture = textureLoader.load('/textures/door/height.jpg')
const metalnessTexture = textureLoader.load('/textures/door/color.jpg')
const ambientOcclusionTexture = textureLoader.load('/textures/door/ambientOcclusion.jpg')
const roughnessTexture = textureLoader.load('/textures/door/roughness.jpg')

/**
 * Texture repeat
 */
// colorTexture.repeat.x = 2
// colorTexture.repeat.y = 2
// // colorTexture.wrapS = THREE.RepeatWrapping
// // colorTexture.wrapT = THREE.RepeatWrapping
// colorTexture.wrapS = THREE.MirroredRepeatWrapping
// colorTexture.wrapT = THREE.MirroredRepeatWrapping

// colorTexture.offset.x = 0.5
// colorTexture.offset.y = 0.5

// colorTexture.rotation = Math.PI/4
// colorTexture.center.x = 0.5
// colorTexture.center.y = 0.5

/**
 * minFilter mipMapping
 */
colorTexture.generateMipmaps = false
colorTexture.minFilter = THREE.NearestFilter
colorTexture.magFilter = THREE.NearestFilter

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
// const material = new THREE.MeshBasicMaterial({ color: 'green' })
// console.log(geometry.attributes.uv);
const material = new THREE.MeshBasicMaterial({ map: colorTexture })
const mesh = new THREE.Mesh(geometry, material)
scene.add(mesh)

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
camera.position.x = 1
camera.position.y = 1
camera.position.z = 1
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