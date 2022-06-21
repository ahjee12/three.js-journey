import * as THREE from "three";
import Experience from "../Experience.js";

export default class Fox {
  constructor() {
    this.experience = new Experience();
    this.scene = this.experience.scene;
    this.resources = this.experience.resources;
    this.time = this.experience.time;
    this.debug = this.experience.debug;

    // Debug
    if (this.debug.active) {
      // folder group 만들기
      this.debugFolder = this.debug.ui.addFolder("fox");
    }

    // Setup
    this.resource = this.resources.items.foxModel;

    this.setModel();
    this.setAnimation();
  }

  setModel() {
    // resource까지는 model아님
    this.model = this.resource.scene;
    this.model.scale.set(0.02, 0.02, 0.02);
    this.scene.add(this.model);
    this.model.traverse((child) => {
      if (child instanceof THREE.Mesh) {
        // object가 shadow를 만들어낼 수 있게 됨
        child.castShadow = true;
      }
    });
  }

  setAnimation() {
    this.animation = {};
    console.log(this.resource);
    // // 에니메이션 믹서
    this.animation.mixer = new THREE.AnimationMixer(this.model);

    // // 믹서 - 클립액션
    // this.animation.action = this.animation.mixer.clipAction(
    //   this.resource.animations[0]
    // );
    this.animation.actions = {};
    this.animation.actions.idle = this.animation.mixer.clipAction(
      this.resource.animations[0]
    );
    this.animation.actions.walking = this.animation.mixer.clipAction(
      this.resource.animations[1]
    );
    this.animation.actions.running = this.animation.mixer.clipAction(
      this.resource.animations[2]
    );

    this.animation.actions.current = this.animation.actions.idle;
    this.animation.actions.current.play();
    this.animation.play = (name) => {
      const newAction = this.animation.actions[name];
      const oldAction = this.animation.actions.current;

      newAction.reset();
      newAction.play();
      // old -> new 전환
      newAction.crossFadeFrom(oldAction, 1);
      this.animation.actions.current = newAction;
    };

    if (this.debug.active) {
      const debugObject = {
        playIdle: () => {
          this.animation.play("idle");
        },
        playWalking: () => {
          this.animation.play("walking");
        },
        playRunning: () => {
          this.animation.play("running");
        },
      };
      this.debugFolder.add(debugObject, "playIdle");
      this.debugFolder.add(debugObject, "playWalking");
      this.debugFolder.add(debugObject, "playRunning");
    }
  }

  update() {
    // delta는 milli second/ mixer는 second
    this.animation.mixer.update(this.time.delta * 0.001);
  }
}
