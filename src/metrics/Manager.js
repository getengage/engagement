import { Scroll, Timer } from '../tracking';

class Manager {

  constructor() {
    this.scroll = new Scroll();
    this.timer = new Timer();
    this.startTracking();
  }

  startTracking() {
    window.addEventListener('scroll', this.scroll.update.bind(this.scroll), false);
  }
}

export default Manager;
