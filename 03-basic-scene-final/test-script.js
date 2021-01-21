console.log('Hello Three.js!')
console.log(THREE) 

//Dom element
const canvas = document.querySelector('.webgl')
console.log(canvas)

//Scene
const scene = new THREE.Scene()

//Red cube
const geometry = new THREE.BoxGeometry(1,1,1)

const material = new THREE.MeshBasicMaterial({color: 0xff0000})

const mesh = new THREE.Mesh(geometry, material)

scene.add(mesh)

//Sizes
const sizes = {
    width: 800,
    height: 600
}

//Camera 보통은 45도 정도 씀
const camera = new THREE.PerspectiveCamera(75, sizes.width /sizes.height)
camera.position.z = 3
camera.position.x = 2
camera.position.y = 2
scene.add(camera)

//render the scene from the camera point of view
//Renderer 
//property 이름과 variable 이름이 같을 경우 생략 가능
const renderer = new THREE.WebGLRenderer({
    canvas: canvas
})

renderer.setSize(sizes.width, sizes.height)
renderer.render(scene, camera)



