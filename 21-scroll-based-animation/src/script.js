import "./style.css";
import * as THREE from "three";
import * as dat from "lil-gui";
import gsap from "gsap";
console.log(gsap);

/**
 * Debug
 */
const gui = new dat.GUI();

const parameters = {
  materialColor: "#ffeded",
};

gui.addColor(parameters, "materialColor").onChange(() => {
  material.color.set(parameters.materialColor);
  particlesMaterial.color.set(parameters.materialColor);
});

/**
 * Base
 */
// Canvas
const canvas = document.querySelector("canvas.webgl");

// Scene
const scene = new THREE.Scene();

/**
 * Objects
 */
// Texture
const textureLoader = new THREE.TextureLoader();
const gradientTexture = textureLoader.load("textures/gradients/3.jpg");
gradientTexture.magFilter = THREE.NearestFilter;

const material = new THREE.MeshToonMaterial();
// Material - MeshToonMaterial
// material.color = new THREE.Color(parameters.materialColor);
material.color.set(parameters.materialColor);
material.gradientMap = gradientTexture;

//Mesh
const objectsDistance = 4;

const mesh1 = new THREE.Mesh(new THREE.TorusGeometry(1, 0.4, 16, 60), material);
const mesh2 = new THREE.Mesh(new THREE.ConeGeometry(1, 2, 32), material);
const mesh3 = new THREE.Mesh(
  new THREE.TorusKnotBufferGeometry(0.8, 0.35, 100, 16),
  material
);
mesh1.position.y = -objectsDistance * 0;
mesh2.position.y = -objectsDistance * 1;
mesh3.position.y = -objectsDistance * 2;

mesh1.position.x = 2;
mesh2.position.x = -2;
mesh3.position.x = 2;

scene.add(mesh1, mesh2, mesh3);
console.log(mesh2.position.x, mesh2.position.y);
const sectionMeshes = [mesh1, mesh2, mesh3];

/**
 * Particle
 */
// Geometry
const particlesCount = 300;

const positions = new Float32Array(particlesCount * 3);
for (let i = 0; i < particlesCount; i++) {
  positions[i * 3 + 0] = (Math.random() - 0.5) * 10;
  positions[i * 3 + 1] =
    objectsDistance * 0.5 -
    Math.random() * objectsDistance * sectionMeshes.length;
  positions[i * 3 + 2] = (Math.random() - 0.5) * 10;
}
// for (let i = 0; i < particlesCount; i++) {
//   positions[i * 3 + 0] = Math.random();
//   positions[i * 3 + 1] = Math.random();
//   positions[i * 3 + 2] = Math.random();
// }
const particleGeometry = new THREE.BufferGeometry();
particleGeometry.setAttribute(
  "position",
  new THREE.BufferAttribute(positions, 3)
);

/**
 * Material
 */
const particlesMaterial = new THREE.PointsMaterial({
  color: parameters.materialColor,
  sizeAttenuation: true,
  size: 0.03,
});

/**
 * Points
 */
const particles = new THREE.Points(particleGeometry, particlesMaterial);
scene.add(particles);

/**
 * Lights
 */
const directionalLight = new THREE.DirectionalLight("#ffffff", 1);
directionalLight.position.set(1, 1, 0);
scene.add(directionalLight);

/**
 * Sizes
 */
const sizes = {
  width: window.innerWidth,
  height: window.innerHeight,
};

window.addEventListener("resize", () => {
  // Update sizes
  sizes.width = window.innerWidth;
  sizes.height = window.innerHeight;

  // Update camera
  camera.aspect = sizes.width / sizes.height;
  camera.updateProjectionMatrix();

  // Update renderer
  renderer.setSize(sizes.width, sizes.height);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
});

/**
 * Camera
 */
// Group
const cameraGroup = new THREE.Group();
scene.add(cameraGroup);

// Base camera
const camera = new THREE.PerspectiveCamera(
  35,
  sizes.width / sizes.height,
  0.1,
  100
);
camera.position.z = 6;
cameraGroup.add(camera);

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
  canvas: canvas,
  alpha: true,
});
// renderer.setClearAlpha(0);
renderer.setSize(sizes.width, sizes.height);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

/**
 * Scroll
 */
let scrollY = window.scrollY;
// section 크기가 일정할 때
let currentSection = 0;
window.addEventListener("scroll", () => {
  scrollY = window.scrollY;
  const newSection = Math.round(scrollY / sizes.height);
  console.log(newSection);
  if (newSection != currentSection) {
    currentSection = newSection;
    gsap.to(sectionMeshes[currentSection].rotation, {
      duration: 1.5,
      ease: "power2.inOut",
      x: "+= 6",
      y: "+= 3",
      z: "+= 1.5",
    });
  }
});

/**
 * Cursor
 */
const cursor = {};
cursor.x = 0;
cursor.y = 0;

window.addEventListener("mousemove", (event) => {
  //   console.log(event);
  cursor.x = event.clientX / sizes.width - 0.5;
  cursor.y = event.clientY / sizes.height - 0.5;
});

/**
 * Animate
 */
const clock = new THREE.Clock();
let previousTime = 0;

const tick = () => {
  const elapsedTime = clock.getElapsedTime();
  const deltaTime = elapsedTime - previousTime;
  previousTime = elapsedTime;

  // Animate Camera
  // ★camera right(plus) -> object는 left / left(minus) -> object right
  // section 1번 scroll -> scroll top이 4에 위치
  camera.position.y = (-scrollY / sizes.height) * objectsDistance;
  //   console.log(camera.position.x, camera.position.y);

  // ※ camera.position바꾸면 이전 position 설정 값을 덮음 -> cameraGroup 위치 바꾸기
  // 마우스 움직임의 반만 움직이기, easing, 화면 크기에 따라 easing 안될 수도 -> deltaTime
  // cameraGroup 값이 0이 될 때까지 frame반복
  const parallaxX = cursor.x * 0.5;
  const parallaxY = -cursor.y * 0.5;
  // console.log(parallaxX, cameraGroup.position.x);
  cameraGroup.position.x +=
    (parallaxX - cameraGroup.position.x) * 5 * deltaTime;
  cameraGroup.position.y +=
    (parallaxY - cameraGroup.position.y) * 5 * deltaTime;

  // Animate meshes
  // rotation이 이전 scoll rotation값을 덮음-> deltaTime 을 더하는 식으로 바꾸기
  for (const mesh of sectionMeshes) {
    mesh.rotation.x += deltaTime * 0.1;
    mesh.rotation.y += deltaTime * 0.12;
    // mesh.rotation.x = elapsedTime * 0.2;
    // mesh.rotation.y = elapsedTime * 0.1;
  }

  // Render
  renderer.render(scene, camera);

  // Call tick again on the next frame
  window.requestAnimationFrame(tick);
};

tick();
