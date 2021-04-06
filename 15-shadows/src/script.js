import './style.css'
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import * as dat from 'dat.gui'

/**
 * Texture
 */
const textureLoader = new THREE.TextureLoader()
//static에 있는 폴더는 /로 시작
const bakedShadow = textureLoader.load('/textures/bakedShadow.jpg')
const simpleShadow = textureLoader.load('/textures/simpleShadow.jpg')



/**
 * Base
 */
// Debug
const gui = new dat.GUI()

// Canvas
const canvas = document.querySelector('canvas.webgl')

// Scene
const scene = new THREE.Scene()

/**
 * Lights
 */
// Ambient light
const ambientLight = new THREE.AmbientLight(0xffffff, 0.3)
gui.add(ambientLight, 'intensity').min(0).max(1).step(0.001)
scene.add(ambientLight)

// Directional light
const directionalLight = new THREE.DirectionalLight(0xffffff, 0.5)
directionalLight.position.set(2, 2, - 1)
gui.add(directionalLight, 'intensity').min(0).max(1).step(0.001)
gui.add(directionalLight.position, 'x').min(- 5).max(5).step(0.001)
gui.add(directionalLight.position, 'y').min(- 5).max(5).step(0.001)
gui.add(directionalLight.position, 'z').min(- 5).max(5).step(0.001)

//CastShadow
directionalLight.castShadow = true
console.log(directionalLight.shadow);


//Shadow.maSize 기본 512x512
directionalLight.shadow.mapSize.width = 1024
directionalLight.shadow.mapSize.height = 1024

//Shadow.camera
directionalLight.shadow.camera.right = 2
directionalLight.shadow.camera.left = -2
directionalLight.shadow.camera.top = 2
directionalLight.shadow.camera.bottom = -2
directionalLight.shadow.camera.near = 1
directionalLight.shadow.camera.far = 6

//Shadow.radius
directionalLight.shadow.radius = 10

//Shadow.type
directionalLight.shadow.type = 10

scene.add(directionalLight)

//lightHelper
const directionalLightCameraHelper = new THREE.CameraHelper(directionalLight.shadow.camera)
//scene에 넣어져 있어도 false하면 안 보임
directionalLightCameraHelper.visible = false
scene.add(directionalLightCameraHelper)

const directionalLightHelper = new THREE.DirectionalLightHelper(directionalLight, 1)
scene.add(directionalLightHelper)

//SpotLight
const spotLight = new THREE.SpotLight(0xffffff, 0.3, 10, Math.PI*0.3)
spotLight.position.set(0, 2, 2)

//CastShadow
spotLight.castShadow = true

//Shadow.mapSize
spotLight.shadow.mapSize.width = 1024
spotLight.shadow.mapSize.height = 1024

//Shadow.camera
spotLight.shadow.camera.fov = 30
spotLight.shadow.camera.near = 1
spotLight.shadow.camera.far = 5

console.log(spotLight);
console.log(spotLight.target);

scene.add(spotLight)
scene.add(spotLight.target)


// const spotLightHelper = new THREE.SpotLightHelper(spotLight)
// scene.add(spotLightHelper)

const spotLightCameraHelper2 = new THREE.CameraHelper(spotLight.shadow.camera)
spotLightCameraHelper2.visible = false
scene.add(spotLightCameraHelper2)

/**
 * pointLight
 */
const pointLight = new THREE.PointLight(0xffffff, 0.3)

//CastShadow
pointLight.castShadow = true
pointLight.position.set(-1, 1, 0)

//Shadow.mapSize
pointLight.shadow.mapSize.width = 1024
pointLight.shadow.mapSize.height = 1024

//Shadow.camera
pointLight.shadow.camera.near = 0.1
pointLight.shadow.camera.far = 5

const pointLightCameraHelper = new THREE.CameraHelper(pointLight.shadow.camera)
pointLightCameraHelper.visible = false
scene.add(pointLightCameraHelper)

scene.add(pointLight)




/**
 * Materials
 */
const material = new THREE.MeshStandardMaterial()
material.roughness = 0.7
gui.add(material, 'metalness').min(0).max(1).step(0.001)
gui.add(material, 'roughness').min(0).max(1).step(0.001)

/**
 * Objects
 */
const sphere = new THREE.Mesh(
    new THREE.SphereGeometry(0.5, 32, 32),
    material
)
sphere.castShadow = true

const plane = new THREE.Mesh(
    new THREE.PlaneGeometry(5, 5),
    // new THREE.MeshBasicMaterial({
    //     map: bakedShadow
    // })
    material
)
plane.rotation.x = - Math.PI * 0.5
plane.position.y = - 0.5

plane.receiveShadow = true

scene.add(sphere, plane)

const sphereShadow = new THREE.Mesh(
    new THREE.PlaneGeometry(1.5, 1.5),
    new THREE.MeshBasicMaterial({
        color: 0x000000,
        //transparent, alphaMap둘 다 
        transparent: true,
        alphaMap: simpleShadow
    })
)
sphereShadow.rotation.x = - Math.PI * 0.5
sphereShadow.position.y = plane.position.y + 0.01
scene.add(sphereShadow)

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
camera.position.z = 2
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
 * ☆Shadow map☆
 */

renderer.shadowMap.enabled = false
//radius 사라짐, but, edge looks better해짐!
renderer.shadowMap.type = THREE.PCFSoftShadowMap

/**
 * Animate
 */
const clock = new THREE.Clock()

const tick = () =>
{   
    // elapsedTime console해보면 계속 증가함!!
    const elapsedTime = clock.getElapsedTime()
    // console.log(elapsedTime)
    //Update the sphere
    // 양옆으로 왔다갔다
    sphere.position.x = Math.cos(elapsedTime) * 1.5 
    // 앞뒤로 왔다갔다
    sphere.position.z = Math.sin(elapsedTime) * 1.5
    sphere.position.y = Math.abs(Math.sin(elapsedTime)*3)

    // Update the shadow
    sphereShadow.position.x = sphere.position.x
    // sphereShadow.position.y = shere.position.y
    sphereShadow.position.z = sphere.position.z
    sphereShadow.material.opacity = (1-sphere.position.y)*0.5

    // Update controls
    controls.update()

    // Render
    renderer.render(scene, camera)

    // Call tick again on the next frame
    window.requestAnimationFrame(tick)
}

tick()