import "./style.css";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import * as dat from "dat.gui";
import typefaceFont from "three/examples/fonts/helvetiker_regular.typeface.json";

console.log(typefaceFont);
/**
 * Base
 */
// Debug
const gui = new dat.GUI();

// Canvas
const canvas = document.querySelector("canvas.webgl");

// Scene
const scene = new THREE.Scene();

/**
 * Axes Helper
 */
const axesHelper = new THREE.AxesHelper();
// scene.add(axesHelper);

/**
 * Textures
 */
const textureLoader = new THREE.TextureLoader();
const mtcpTexture1 = textureLoader.load("/textures/matcaps/15.jpg");
const mtcpTextureDonut = textureLoader.load("/textures/matcaps/15.jpg");

/**
 * Fonts
 */
const fontLoader = new THREE.FontLoader();
const texts = [];

fontLoader.load("/fonts/helvetiker_regular.typeface.json", (font) => {
  console.log("font loaded");
  const textGeometry = new THREE.TextGeometry("Hyunji Three.js", {
    font: font,
    size: 0.5,
    height: 0.2,
    curveSegments: 6,
    bevelEnabled: true,
    bevelThickness: 0.03,
    bevelSize: 0.04,
    bevelOffset: 0,
    bevelSegments: 6,
  });
  textGeometry.computeBoundingBox();
  console.log(textGeometry.boundingBox);
  console.log(textGeometry.boundingBox.max.x);
  //bevelThickness 등 설정 값 때문에
  // textGeometry.translate(
  //     -(textGeometry.boundingBox.max.x-0.02) *0.5,
  //     -(textGeometry.boundingBox.max.y-0.2 + 0.02) *0.5,
  //     -(textGeometry.boundingBox.max.z-0.03) *0.5
  // )

  //더 간단한 방법!!
  textGeometry.center();

  //로드한 material -> textmaterial matcap에 넣기
  const textMaterial = new THREE.MeshMatcapMaterial();
  const material = new THREE.MeshMatcapMaterial();
  textMaterial.matcap = mtcpTexture1;
  // textMaterial.wireframe = true
  const text = new THREE.Mesh(textGeometry, textMaterial);
  texts.push(text);
  scene.add(text);
});

console.time("donuts");

//☆☆Optimization 1. for문 안에 있는 것 중 1번만 돌려도 되는 거 = 도넛 geometry( 도넛 mesh를 여러 번!) 2. material이 같을 경우,  textMaterial, donutMaterial을 material로 통일
const donutGeometry = new THREE.TorusBufferGeometry(0.3, 0.18, 20, 45);
const donutMaterial = new THREE.MeshMatcapMaterial();
donutMaterial.matcap = mtcpTextureDonut;
const donuts = [];

for (let i = 0; i < 1000; i++) {
  const donut = new THREE.Mesh(donutGeometry, donutMaterial);
  donuts.push(donut);

  let x,
    y,
    z = 0;
  const xLimit = 2.5;
  const yLimit = 0.5;
  const zLimit = 0.13;

  let flag = false;
  while (!flag) {
    x = (Math.random() - 0.5) * 40;
    y = (Math.random() - 0.5) * 40;
    z = (Math.random() - 0.5) * 40;
    if (
      x >= -xLimit &&
      x <= xLimit &&
      y >= -yLimit &&
      y <= yLimit &&
      z >= -xLimit &&
      z <= xLimit
    ) {
    } else {
      flag = true;
    }
  }

  donut.position.x = x;
  donut.position.y = y;
  donut.position.z = z;

  const scale = Math.random();
  //   donut.rotation.x = scale;
  //   donut.rotation.y = scale;
  //   donut.rotation.z = scale;
  console.log(
    `${donut.position.x} / ${donut.position.y} / ${donut.position.z}`
  );
  donut.scale.set(scale, scale, scale);
  scene.add(donut);
} //for문
console.timeEnd("donuts");

/**
 * Object
 */
const cube = new THREE.Mesh(
  new THREE.BoxBufferGeometry(1, 1, 1),
  new THREE.MeshBasicMaterial()
);

// scene.add(cube)

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
// Base camera
const camera = new THREE.PerspectiveCamera(
  75,
  sizes.width / sizes.height,
  0.1,
  100
);
camera.position.x = 1;
camera.position.y = 1;
camera.position.z = 2;
scene.add(camera);

// Controls
const controls = new OrbitControls(camera, canvas);
controls.enableDamping = true;

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
  canvas: canvas,
});
renderer.setSize(sizes.width, sizes.height);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
renderer.setClearColor(0xffffff);

/**
 * Animate
 */
const clock = new THREE.Clock();

const tick = (donut) => {
  const elapsedTime = clock.getElapsedTime();

  //Update objects
  texts.forEach((elem) => {
    elem.rotation.y = elapsedTime * Math.PI * 0.1;
  });

  //donuts
  donuts.forEach((elem) => {
    elem.rotation.x = elapsedTime * Math.PI * 0.05;
    elem.rotation.y = elapsedTime * Math.PI * 0.1;
  });

  //controls
  controls.update();

  // Render
  renderer.render(scene, camera);

  // Call tick again on the next frame
  window.requestAnimationFrame(tick);
};

tick();
