import './style.css'
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import { PointLight } from 'three'
import * as dat from 'dat.gui'

/**
 * Debug
 */
const gui = new dat.GUI()

/**
 * Base
 */
// Canvas
const canvas = document.querySelector('canvas.webgl')

// Scene
const scene = new THREE.Scene()

/**
 * Texture
 */
const textureLoader = new THREE.TextureLoader()
const cubeTextureLoader = new THREE.CubeTextureLoader()

const colorTexture = textureLoader.load('/textures/door/color.jpg')
const normalTexture = textureLoader.load('/textures/door/normal.jpg')
const alphaTexture = textureLoader.load('/textures/door/alpha.jpg')
const heightTexture = textureLoader.load('/textures/door/height.jpg')
const metalnessTexture = textureLoader.load('/textures/door/color.jpg')
const ambientOcclusionTexture = textureLoader.load('/textures/door/ambientOcclusion.jpg')
const roughnessTexture = textureLoader.load('/textures/door/roughness.jpg')

const mtcpTexture = textureLoader.load('/textures/matcaps/1.png')
const mtcpTexture2 = textureLoader.load('/textures/matcaps/2.png')
const mtcpTexture3 = textureLoader.load('/textures/matcaps/3.png')
const mtcpTexture4 = textureLoader.load('/textures/matcaps/4.png')
const mtcpTexture5 = textureLoader.load('/textures/matcaps/5.png')
const mtcpTexture6 = textureLoader.load('/textures/matcaps/6.png')
const gradientTexture = textureLoader.load('/textures/gradients/5.jpg')

//array
const environmentMapTexture = cubeTextureLoader.load([
    '/textures/environmentMaps/0/nx.jpg',
    '/textures/environmentMaps/0/nz.jpg',
    '/textures/environmentMaps/0/px.jpg',
    '/textures/environmentMaps/0/ny.jpg',
    '/textures/environmentMaps/0/py.jpg',
    '/textures/environmentMaps/0/pz.jpg'
])




/**
 * MeshBasicMaterial
 */
// const material = new THREE.MeshBasicMaterial()
// // const material = new THREE.MeshBasicMaterial({map: colorTexture})
// material.map = colorTexture
// // material.color.set('red')
// // material.color = new THREE.Color('pink')
// // material.color = new THREE.Color(0xff00ff)
// // material.color = new THREE.Color(0x00ff00)
// console.log(material.color);
// console.log(material.map);
// // material.wireframe = true;
// // material.opacity = 0.5
// material.transparent = true
// material.alphaMap = alphaTexture
// material.side = THREE.BackSide

/**
 * MeshNormalMaterial
 */
// const material = new THREE.MeshNormalMaterial()
// material.flatShading = true
// material.transparent = true


/**
 * MeshMatcapMaterial
 */
// const material = new THREE.MeshMatcapMaterial()
// material.matcap = mtcpTexture

/**
 * MeshDepthMaterial
 */
// const material = new THREE.MeshDepthMaterial()

/**
 * MeshLambertMaterial light과 함께 써야함
 */
// const material  = new THREE.MeshLambertMaterial()

/**
 * MeshPhongMaterial()
 */
// const material = new THREE.MeshPhongMaterial()
// material.shininess = 100
// material.specular = new THREE.Color(0xff0000)

/**
 * MeshToonMaterial()
 */
// gradientTexture.minFilter = THREE.NearestFilter
// gradientTexture.magFilter = THREE.NearestFilter

// const material = new THREE.MeshToonMaterial()
// material.gradientMap = gradientTexture

/**
 * MeshStandardMaterial 스탠다드 속성 많음!!
 */
// const material = new THREE.MeshStandardMaterial()
// material.metalness = 0
// material.roughness = 1
// material.map = colorTexture

// material.aoMap = ambientOcclusionTexture
// material.aoMapIntersity = 1

// material.displacementMap = heightTexture
// material.displacementScale = 0.05

// //metalness, roughness가 map에 영향을 줌
// material.metalnessMap = metalnessTexture
// material.roughnessMap = metalnessTexture

// //normal은 윤곽을 섬세하게 만듦
// material.normalMap = normalTexture
// material.normalScale.set(0.5,0.5)

// material.alphaMap = alphaTexture
// material.transparent = true

/**
 * 
 */

const material = new THREE.MeshStandardMaterial()
material.metalness = 0.7
material.roughness = 0.5
material.envMap = environmentMapTexture

gui.add(material, 'metalness')
    .min(0)
    .max(1)
    .step(0.01)

gui.add(material, 'roughness')
    .min(0)
    .max(1)
    .step(0.01)

// gui.add(material, 'aoMapIntersity')
//     .min(0)
//     .max(1)
//     .step(0.01)

// gui.add(material, 'displacementScale')
//     .min(0)
//     .max(1)
//     .step(0.01)


/**
 * Objects
 */

const geometry1 = new THREE.SphereBufferGeometry(0.5, 16, 16)

const sphere = new THREE.Mesh(
    geometry1,
    material
)
sphere.position.x = -1.5

const geometry2 = new THREE.PlaneBufferGeometry(1,1, 100, 100)

const plane = new THREE.Mesh(
    geometry2,
    material
)
plane.geometry.setAttribute('uv2', new THREE.BufferAttribute(plane.geometry.attributes.uv.array, 2))
console.log(plane.geometry.attributes);
console.log(plane.geometry.attributes.uv);

const torus = new THREE.Mesh(
    new THREE.TorusBufferGeometry(0.3, 0.2, 64, 128),
    material
)
torus.position.x = 1.5
torus.geometry.setAttribute('uv2', new THREE.BufferAttribute(torus.geometry.attributes.uv.array, 2))

scene.add(sphere, plane, torus)



/**
 * Light
 */
const ambientLight = new THREE.AmbientLight(0xffffff, 0.5)
scene.add(ambientLight)

const pointLight = new THREE.PointLight(0xffffff, 0.5)
pointLight.position.x = 2
pointLight.position.y = 3
pointLight.position.z = 4
scene.add(pointLight)


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
 * Animate
 */
const clock = new THREE.Clock()

const tick = () =>
{
    const elapsedTime = clock.getElapsedTime()

    // Update objects
    sphere.rotation.y = 0.1 * elapsedTime
    plane.rotation.y = 0.1 * elapsedTime
    torus.rotation.y = 0.1 * elapsedTime

    sphere.rotation.x = 0.1 * elapsedTime
    plane.rotation.x = 0.1 * elapsedTime
    torus.rotation.x = 0.1 * elapsedTime
    

    // Update controls
    controls.update()

    // Render
    renderer.render(scene, camera)

    // Call tick again on the next frame
    window.requestAnimationFrame(tick)
}

tick()