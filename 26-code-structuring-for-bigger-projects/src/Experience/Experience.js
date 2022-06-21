import * as THREE from "three";
import Sizes from "./Utils/Sizes";
import Time from "./Utils/Time";
import Camera from "./Camera";
import Renderer from "./Renderer";
import World from "./World/World";
import Resources from "./Utils/Resource";
import Debug from "./Utils/Debug";
import sources from "./sources.js";

let instance = null;

export default class Experience {
  constructor(canvas) {
    // singleton
    if (instance) {
      return instance;
    }
    instance = this;

    // global access
    window.experience = this;
    console.log("Here starts a great experience");

    // Options
    this.canvas = canvas;
    console.log(canvas);

    // Setup
    this.debug = new Debug();
    this.sizes = new Sizes();
    this.time = new Time();
    this.scene = new THREE.Scene();
    this.resources = new Resources(sources);
    this.camera = new Camera();
    this.renderer = new Renderer();
    this.world = new World();

    // Sizes, Time 클래스 안에서 camera 처리하지 않고 외부 Experience클래스에서 처리
    // trigger inside -> listen outside
    // arrow function만 this context 유지
    // this.sizes.on("resizeLove", this.resize);
    this.sizes.on("resizeLove", () => {
      console.log("heard resize!!");
      this.resize();
    });

    // Time tick event
    this.time.on("tick", () => {
      //   console.log("heard time!!");
      //  update메서드로 분리
      this.update();
    });
  }

  resize() {
    console.log("resize occured");
    console.log(this);
    this.camera.resize();
    this.renderer.resize();
  }

  update() {
    // console.log("update the experience");
    this.camera.update();
    this.world.update();
    this.renderer.update();
  }

  // complex project일 경우 update()처럼 각 class에 distroy method 넣기
  destroy() {
    this.sizes.off("resizeLove");
    this.time.off("tick");

    // object만 걸러내기
    //Q object만 모아둔 배열 있다면 loop돌면서 scene.remove(object.mesh)할 수 있음
    this.scene.traverse((child) => {
      if (child instanceof THREE.Mesh) {
        child.geometry.dispose();
        for (const key in child.material) {
          const value = child.material[key];
          if (value && typeof value.dispose === "function") {
            value.dispose();
          }
        }
      }
    });

    this.camera.controls.dispose();
    this.renderer.instance.dispose();

    if (this.debug.active) {
      this.debug.ui.destroy();
    }
  }
}
