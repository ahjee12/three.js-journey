import './style.css'
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import * as dat from 'dat.gui'


/**
 * Base
 */
// Debug
const gui = new dat.GUI()

// Canvas
const canvas = document.querySelector('canvas.webgl')

// Scene
const scene = new THREE.Scene()

// Fog
const fog = new THREE.Fog('#262837', 1, 15)
gui.add(fog, 'near').min(0).max(3).step(0.01)
gui.add(fog, 'far').min(0).max(15).step(0.01)
scene.fog = fog

/**
 * Textures
 */
const textureLoader = new THREE.TextureLoader()

const doorColorTexture = textureLoader.load('../textures/door/color.jpg')
const doorAlphaTexture = textureLoader.load('../textures/door/alpha.jpg')
const doorAmbientOcclusionTexture = textureLoader.load('../textures/door/ambientOcclusion.jpg')
const doorHeightTexture = textureLoader.load('../textures/door/height.jpg')
const doorNormalTexture = textureLoader.load('../textures/door/normal.jpg')
const doorMetalnessTexture = textureLoader.load('../textures/door/metalness.jpg')
const doorRoughnessTexture = textureLoader.load('../textures/door/roughness.jpg')

console.log(doorColorTexture);
console.log(doorNormalTexture);
console.log(doorMetalnessTexture);
console.log(doorRoughnessTexture);

const bricksColorTexture = textureLoader.load('../textures/bricks/color.jpg')
const bricksAmbientOcclusionTexture = textureLoader.load('../textures/bricks/ambientOcclusion.jpg')
const bricksNormalTexture = textureLoader.load('../textures/bricks/normal.jpg')
const bricksRoughnessTexture = textureLoader.load('../textures/bricks/roughness.jpg')

const grassColorTexture = textureLoader.load('../textures/grass/color.jpg')
const grassAmbientOcclusionTexture = textureLoader.load('../textures/grass/ambientOcclusion.jpg')
const grassNormalTexture = textureLoader.load('../textures/grass/normal.jpg')
const grassRoughnessTexture = textureLoader.load('../textures/grass/roughness.jpg')

grassColorTexture.repeat.set(8, 8)
grassAmbientOcclusionTexture.repeat.set(8, 8)
grassNormalTexture.repeat.set(8, 8)
grassRoughnessTexture.repeat.set(8, 8)

grassColorTexture.wrapS = THREE.RepeatWrapping
grassAmbientOcclusionTexture.wrapS = THREE.RepeatWrapping
grassNormalTexture.wrapS = THREE.RepeatWrapping
grassRoughnessTexture.wrapS = THREE.RepeatWrapping

grassColorTexture.wrapT = THREE.RepeatWrapping
grassAmbientOcclusionTexture.wrapT = THREE.RepeatWrapping
grassNormalTexture.wrapT = THREE.RepeatWrapping
grassRoughnessTexture.wrapT = THREE.RepeatWrapping

console.log(grassColorTexture.repeat)


/**
 * Ghosts
 */
const ghost1 = new THREE.PointLight('#ff00ff', 2, 3)
scene.add(ghost1)

const ghost2 = new THREE.PointLight('#00ffff', 2, 3)
scene.add(ghost2)

const ghost3 = new THREE.PointLight('#ffff00', 2, 3)
scene.add(ghost3)

/**
 * House
 */
const house = new THREE.Group()
scene.add(house)
//Walls
const walls = new THREE.Mesh(
    new THREE.BoxGeometry(4, 2.5, 4),
    new THREE.MeshStandardMaterial({
        map: bricksColorTexture,
        aoMap: bricksAmbientOcclusionTexture,
        normalMap: bricksNormalTexture,
        roughness: bricksRoughnessTexture
    })
)
walls.geometry.setAttribute('uv2', new THREE.Float32BufferAttribute(walls.geometry.attributes.uv.array, 2))
//bouning은 geometry에만 쓸 수 있음!! mesh -> geometry -> boundingBox 
walls.geometry.computeBoundingBox()
// console.log();
// walls.position.y = walls.geometry.boundingBox.max.y/2
walls.position.y = 1.25
house.add(walls)

//Roof
const roof = new THREE.Mesh(
    new THREE.ConeGeometry(3.5, 1, 4),
    new THREE.MeshStandardMaterial({color: '#b35f45'})
)
// roof.position.y = walls.geometry.boundingBox.max.y + 0.5
roof.position.y = 0.5 + 2.5
roof.rotation.y = Math.PI*0.25
house.add(roof)

//Door
const door = new THREE.Mesh(
    new THREE.PlaneGeometry(2.2, 2.2, 100, 100),
    // alphaMap 적용하려면 transparent: true해야 함 
    new THREE.MeshStandardMaterial({
        map: doorColorTexture, 
        alphaMap: doorAlphaTexture, 
        transparent: true,
        aoMap: doorAmbientOcclusionTexture,
        displacementMap: doorHeightTexture, 
        // wireframe: true,
        displacementScale: 0.2,
        normalMap: doorNormalTexture,
        metalnessMap: doorMetalnessTexture,
        roughnessTexture: doorRoughnessTexture
    })
    // new THREE.MeshStandardMaterial({map: doorColorTexture, alphaMap: doorAlphaTexture})
)
door.geometry.setAttribute('uv2', new THREE.Float32BufferAttribute(door.geometry.attributes.uv.array, 2))
door.position.y = 1
door.position.z = 2 + 0.01
house.add(door)

//Bushes
const bushGeometry = new THREE.SphereGeometry(1, 16, 16)
const bushMaterial = new THREE.MeshStandardMaterial({color: '#89c854'})

const bush1 = new THREE.Mesh(bushGeometry, bushMaterial)
bush1.scale.set(0.5, 0.5, 0.5)
// x y z z는 (wall z는 4니까 절반 정도) 
bush1.position.set(1, 0.2, 2.2)

const bush2 = new THREE.Mesh(bushGeometry, bushMaterial)
bush2.scale.set(0.25, 0.25, 0.25)
bush2.position.set(1.7, 0.2, 2.2)

const bush3 = new THREE.Mesh(bushGeometry, bushMaterial)
bush3.scale.set(0.25, 0.25, 0.25)
bush3.position.set(-1, 0.2, 2.2)

const bush4 = new THREE.Mesh(bushGeometry, bushMaterial)
bush4.scale.set(0.25, 0.25, 0.25)
bush4.position.set(-1.5, 0.2, 2.2)

house.add(bush1, bush2, bush3, bush4)

// Graves
const graves = new THREE.Group()
scene.add(graves)

const graveGeometry = new THREE.BoxGeometry(0.6, 0.8, 0.2)
const graveMaterial = new THREE.MeshStandardMaterial({ color: '#b2b6b1'})


for(let i =0; i< 50; i ++){
    const angle = Math.random()*Math.PI*2
    const radius = Math.random()*6 + 3                        
     console.log(angle)
    const x = Math.sin(angle) * radius
    const z = Math.cos(angle) * radius

    const grave = new THREE.Mesh(graveGeometry, graveMaterial)
    grave.position.set(x, 0.3, z)
    grave.rotation.y = (Math.random() - 0.5) * 0.4
    grave.rotation.z = (Math.random() - 0.5) * 0.4

    graves.add(grave)

    grave.castShadow = true
}

// house.add()

// Floor
const floor = new THREE.Mesh(
    new THREE.PlaneGeometry(20, 20),
    new THREE.MeshStandardMaterial({ 
        map: grassColorTexture,
        aoMap: grassAmbientOcclusionTexture,
        normalMap: grassNormalTexture,
        roughness: grassRoughnessTexture
     })
)
floor.geometry.setAttribute('uv2', new THREE.Float32BufferAttribute(floor.geometry.attributes.uv.array, 2))
floor.rotation.x = - Math.PI * 0.5
floor.position.y = 0
scene.add(floor)

/**
 * Lights
 */
// Ambient light shadow못 씀
const ambientLight = new THREE.AmbientLight('#ffffff', 0.12)
gui.add(ambientLight, 'intensity').min(0).max(1).step(0.001)
scene.add(ambientLight)

// Directional light
const moonLight = new THREE.DirectionalLight('#ffffff', 0.12)

moonLight.position.set(4, 5, - 2)
gui.add(moonLight, 'intensity').min(0).max(1).step(0.001)
gui.add(moonLight.position, 'x').min(- 5).max(5).step(0.001)
gui.add(moonLight.position, 'y').min(- 5).max(5).step(0.001)
gui.add(moonLight.position, 'z').min(- 5).max(5).step(0.001)
scene.add(moonLight)

//Door light
const doorLight = new THREE.PointLight('#ff7d46', 1, 7)
doorLight.position.set(0, 2.2, 2.7) 
gui.add(doorLight, 'intensity').min(0).max(1).step(0.001)
gui.add(doorLight.position, 'x').min(0).max(5).step(0.001)
gui.add(doorLight.position, 'y').min(0).max(5).step(0.001)
gui.add(doorLight.position, 'z').min(0).max(5).step(0.001)
house.add(doorLight)


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
camera.position.x = 4
camera.position.y = 2
camera.position.z = 5
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
renderer.setClearColor('#262837')

renderer.shadowMap.enabled = true

/**
 * Shadow
 */
//shadow cast 전 shadowMap 활성화!!!
renderer.shadowMap.enabled = true
//shadow 부드럽게
renderer.shadowMap.type = THREE.PCFSoftShadowMap
moonLight.castShadow = true
doorLight.castShadow = true
ghost1.castShadow = true
ghost2.castShadow = true
ghost3.castShadow = true

walls.castShadow = true
bush1.castShadow = true
bush2.castShadow = true
bush3.castShadow = true
bush4.castShadow = true

floor.receiveShadow = true

//shadow 최적화
doorLight.shadow.mapSize.width = 256
doorLight.shadow.mapSize.height = 256
doorLight.shadow.camera.far = 7


ghost1.shadow.mapSize.width = 256
ghost1.shadow.mapSize.height = 256
ghost1.shadow.camera.far = 7

ghost2.shadow.mapSize.width = 256
ghost2.shadow.mapSize.height = 256
ghost2.shadow.camera.far = 7

ghost3.shadow.mapSize.width = 256
ghost3.shadow.mapSize.height = 256
ghost3.shadow.camera.far = 7


/**
 * Animate
 */
const clock = new THREE.Clock()

const tick = () =>
{
    const elapsedTime = clock.getElapsedTime()

    // ghost1
    // Update ghostAngle = elapsedTime
    const ghost1Angle = elapsedTime * 0.5
    // console.log(ghostAngle)
    ghost1.position.x = Math.cos(ghost1Angle) * 4
    ghost1.position.z = Math.sin(ghost1Angle) * 4
    //ghostAngle에 곱하는 수 커지면 아래 위로 움직이는 속도 빨라짐
    // ghost1.position.y = Math.sin(ghost1Angle * 10)
    ghost1.position.y = Math.sin(ghost1Angle * 3)

    
    // ghosts2
    const ghost2Angle = - elapsedTime * 0.32

    ghost2.position.x = Math.cos(ghost2Angle) * 4
    ghost2.position.z = Math.sin(ghost2Angle) * 4
    ghost2.position.y = Math.sin(ghost2Angle * 4) + Math.sin(ghost2Angle * 2.5)

    // ghosts3.
    const ghost3Angle = - elapsedTime * 0.18

    ghost3.position.x = Math.cos(ghost3Angle) * (7 + Math.sin(elapsedTime*0.32))
    ghost3.position.z = Math.sin(ghost3Angle) * (7 + Math.sin(elapsedTime*0.5))
    ghost3.position.y = Math.sin(ghost3Angle * 5) + Math.sin(ghost3Angle * 2.5)

    // Update controls
    controls.update()

    // Render
    renderer.render(scene, camera)

    // Call tick again on the next frame
    window.requestAnimationFrame(tick)
}

tick()