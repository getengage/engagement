import { Scroll, Timer } from '../tracking';

class Manager {

  constructor() {
    this.scroll = new Scroll();
    this.timer = new Timer();
    this.startTracking();
  }

  startTracking() {
    setInterval(function updater() {
      this.scroll.update();
      this.timer.update();
    }, 250);
  }

}

export default Manager;
