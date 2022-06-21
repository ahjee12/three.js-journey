import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/gltfloader";
import EventEmitter from "./EventEmitter";

export default class Resources extends EventEmitter {
  constructor(sources) {
    super();

    // Options
    // 배열
    this.sources = sources;
    console.log(this.sources);
    // Setup
    this.items = {};
    this.toLoad = this.sources.length;
    console.log(this.toLoad);

    this.loaded = 0;

    this.setLoaders();
    this.startLoading();
  }

  setLoaders() {
    // 종류가 여러가지일 때 object에 넣기
    this.loaders = {};
    this.loaders.gltfLoader = new GLTFLoader();
    this.loaders.textureLoader = new THREE.TextureLoader();
    this.loaders.cubeTextureLoader = new THREE.CubeTextureLoader();
  }

  startLoading() {
    for (const source of this.sources) {
      if (source.type === "gltfModel") {
        this.loaders.gltfLoader.load(source.path, (file) => {
          this.sourceLoaded(source, file);
        });
      } else if (source.type === "texture") {
        this.loaders.textureLoader.load(source.path, (file) => {
          this.sourceLoaded(source, file);
        });
      } else if (source.type === "cubeTexture") {
        this.loaders.cubeTextureLoader.load(source.path, (file) => {
          this.sourceLoaded(source, file);
        });
      }
    }
  }

  sourceLoaded(source, file) {
    // 실제 key name아닌 인자를 name으로 받을 때
    this.items[source.name] = file;
    this.loaded++;

    if (this.loaded === this.toLoad) {
      console.log("resouces loaded finished!");
      this.trigger("ready");
    }
  }
}
