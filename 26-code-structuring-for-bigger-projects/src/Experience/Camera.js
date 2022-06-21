import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/orbitcontrols";
import Experience from "./Experience";
export default class Camera {
  constructor() {
    console.log("My camera");
    // global variable
    // this.experience = window.experience;

    // transfer
    // this.experience = experience;

    // singleton
    this.experience = new Experience();
    this.sizes = this.experience.sizes;
    this.scene = this.experience.scene;
    this.canvas = this.experience.canvas;

    // method 호출 대신 안에 있는 식을 그대로 constructor에 넣을 수도 있음
    this.setInstance();
    this.setOrbitControls();

    this.sizes.on("resize", () => {
      console.log("Hey");
    });
  }

  setInstance() {
    this.instance = new THREE.PerspectiveCamera(
      35,
      this.sizes.width / this.sizes.height,
      0.1,
      100
    );
    this.instance.position.set(6, 4, 8);
    this.scene.add(this.instance);
  }

  setOrbitControls() {
    this.controls = new OrbitControls(this.instance, this.canvas);
    this.controls.enableDamping = true;
  }

  resize() {
    console.log("resize camera");
    this.instance.aspect = this.sizes.width / this.sizes.height;
    this.instance.updateProjectionMatrix();
  }

  update() {
    //
    this.controls.update();
  }
}
