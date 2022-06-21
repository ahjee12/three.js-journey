import * as THREE from "three";
import Experience from "../Experience";

export default class Environment {
  constructor() {
    this.experience = new Experience();
    this.scene = this.experience.scene;
    this.resources = this.experience.resources;
    this.debug = this.experience.debug;

    // Debug
    // debug.active true가 아닐 경우 dat.GUI 없음 -> this.debug.ui없음
    if (this.debug.active) {
      this.debugFolder = this.debug.ui.addFolder("environment");
    }
    this.setSunLight();
    this.EnvironmentMap();
  }

  setSunLight() {
    this.sunLight = new THREE.DirectionalLight("#ffffff", 4);
    this.sunLight.castShadow = true;
    this.sunLight.shadow.camera.far = 15;
    this.sunLight.shadow.mapSize.set(1024, 1024);
    this.sunLight.shadow.normalBias = 0.05;
    this.sunLight.position.set(3.5, 2, -1.25);
    this.scene.add(this.sunLight);

    if (this.debug.active) {
      this.debugFolder
        .add(this.sunLight, "intensity")
        .name("sunIntensity")
        .min(0)
        .max(10)
        .step(0.001);
      this.debugFolder
        .add(this.sunLight.position, "x")
        .name("sunLightX")
        .min(-5)
        .max(5)
        .step(0.001);
      this.debugFolder
        .add(this.sunLight.position, "y")
        .name("sunLightY")
        .min(-5)
        .max(5)
        .step(0.001);
      this.debugFolder
        .add(this.sunLight.position, "z")
        .name("sunLightZ")
        .min(-5)
        .max(5)
        .step(0.001);
    }
  }

  EnvironmentMap() {
    // object 정의부터 하기!
    this.environmentMap = {};
    this.environmentMap.intensity = 0.01;
    this.environmentMap.texture = this.resources.items.environmentMapTexture;
    this.environmentMap.texture.encoding = THREE.sRGBEncoding;

    this.scene.environment = this.environmentMap.texture;

    // Q debug
    this.environmentMap.updateMaterials = () => {
      this.scene.traverse((child) => {
        console.log(child);
        if (
          child instanceof THREE.Mesh &&
          child.material instanceof THREE.MeshStandardMaterial
        ) {
          child.material.envMapIntensity = this.environmentMap.intensity;
          child.material.envMap = this.environmentMap.texture;
          child.material.needsUpdate = true;
        }
      });
    };

    this.environmentMap.updateMaterials();

    if (this.debug.active) {
      // debug object 속성이 바뀔 때 어떤 object에 적용되는 건지 봐야함
      // scene안에 있는 모든 objects에 적용해야 험, function에서 처리했으니 function 호출 필수
      this.debugFolder
        .add(this.environmentMap, "intensity")
        .name("envMapIntensity")
        .min(0)
        .max(4)
        .step(0.001)
        .onChange(this.environmentMap.updateMaterials);
    }
  }
}
