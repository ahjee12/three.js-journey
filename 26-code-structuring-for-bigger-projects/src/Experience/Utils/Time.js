import EventEmitter from "./EventEmitter";

export default class Time extends EventEmitter {
  constructor() {
    super();

    this.start = Date.now();
    this.current = this.start;
    this.elapsed = 0;
    // frame 16 milli seconds
    this.delta = 16;
    console.log("start: " + this.start);
    // 맨 처음 delta = 0 되는 거 방지
    window.requestAnimationFrame(() => {
      console.log("frame tick tick");
      this.tick();
    });
  }
  tick() {
    const currentTime = Date.now();
    // console.log("tick");
    // 이전 시간을 담을 곳이 필요 - this.current
    this.delta = currentTime - this.current;
    // console.log("delta: " + this.delta);
    this.current = currentTime;
    // this.start 고정
    this.elapsed = this.current - this.start;
    // console.log("elapsed: " + this.elapsed);
    this.trigger("tick");
    // arrow fucntion
    window.requestAnimationFrame(() => {
      this.tick();
    });
  }
}
