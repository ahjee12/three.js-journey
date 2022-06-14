import Sizes from "./Utils/Sizes";

export default class Experience {
  constructor(canvas) {
    // global access
    window.experience = this;
    console.log("Here starts a great experience");

    // Options
    this.canvas = canvas;
    console.log(canvas);

    // Setup
    this.sizes = new Sizes();
    // trigger inside, listen outside
    this.sizes.on("resizeLove", () => {
      console.log("heard resize!!");
      this.resize();
    });
    // this.sizes.on("resizeLove", this.resize);
  }

  resize() {
    console.log("resize occured");
    console.log(this);
  }
}
