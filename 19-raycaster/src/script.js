import "./style.css";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import * as dat from "dat.gui";

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
 * Objects
 */
const object1 = new THREE.Mesh(
  new THREE.SphereGeometry(0.2, 16, 8),
  new THREE.MeshBasicMaterial({ color: "#ff0000" })
);
object1.position.x = -1;

const object2 = new THREE.Mesh(
  new THREE.SphereGeometry(0.5, 16, 8),
  new THREE.MeshBasicMaterial({ color: "#ff0000" })
);

const object3 = new THREE.Mesh(
  new THREE.SphereGeometry(0.5, 16, 8),
  new THREE.MeshBasicMaterial({ color: "#ff0000" })
);
object3.position.x = 3;

scene.add(object1, object2, object3);

/**
 * Raycaster
 */
// const raycaster = new THREE.Raycaster();

// const rayOrigin = new THREE.Vector3(-3, 0, 0);
// const rayDirection = new THREE.Vector3(10, 0, 0);
// console.log(rayDirection.length());
// rayDirection.normalize();
// console.log(rayDirection.length());
// raycaster.set(rayOrigin, rayDirection);

// const intersect = raycaster.intersectObject(object2);
// console.log(intersect);

// const intersects = raycaster.intersectObjects(object1, object2, object3);
// console.log(intersects);

const raycaster = new THREE.Raycaster();

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
 * Mouse
 */
const mouse = new THREE.Vector2();
window.addEventListener("mousemove", (event) => {
  mouse.x = (event.clientX - sizes.width / 2) / (sizes.width / 2);
  //   console.log(mouse.x);
  //   mouse.x = event.clientX/sizes.width*2 -1
  mouse.y = -(event.clientY - sizes.height / 2) / (sizes.height / 2);
  //   console.log(mouse.y);
});

window.addEventListener("click", () => {
  console.log("click anywhere");
  if (currentIntersect) {
    console.log(currentIntersect);
    switch (currentIntersect.object) {
      case object1:
        console.log("object1");
        break;
      case object2:
        console.log("object2");
        break;
      case object3:
        console.log("object3");
        break;
    }
  }
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
camera.position.z = 3;
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

/**
 * Animate
 */
const clock = new THREE.Clock();

let currentIntersect = null;

const tick = () => {
  const elapsedTime = clock.getElapsedTime();
  object1.position.y = Math.sin(elapsedTime * 0.3);
  object2.position.y = Math.sin(elapsedTime * 0.5);
  object3.position.y = Math.sin(elapsedTime * 0.7);

  // Animate objects

  raycaster.setFromCamera(mouse, camera);

  // Cast a ray
  //   const rayOrigin = new THREE.Vector3(-3, 0, 0);
  //   const rayDirection = new THREE.Vector3(1, 0, 0);
  //   rayDirection.normalize();
  //   raycaster.set(rayOrigin, rayDirection);

  // Intersect <마우스 카메라 + intersect> <디렉션 세트 + intersect>
  const objectsToTest = [object1, object2, object3];
  const intersects = raycaster.intersectObjects(objectsToTest);
  //   console.log(intersects);
  for (const object of objectsToTest) {
    object.material.color.set("#ff0000");
  }
  for (const intersect of intersects) {
    // console.log(intersect.object);
    intersect.object.material.color.set("#0000ff");
  }

  if (intersects.length) {
    // console.log("sth being hovered");
    if (currentIntersect === null) {
      console.log("mouse enter");
    }
    currentIntersect = intersects[0];
  } else {
    // console.log("nothing being hovered");
    if (currentIntersect) {
      console.log("mouse leave");
    }
    currentIntersect = null;
  }

  // Update controls
  controls.update();

  // Render
  renderer.render(scene, camera);

  // Call tick again on the next frame
  window.requestAnimationFrame(tick);
};

tick();
