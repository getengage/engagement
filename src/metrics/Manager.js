import { Scroll, Timer } from '../tracking';
import { Adapters } from '../utils/';

class Manager {

  constructor() {
    this.scroll = new Scroll();
    this.timer = new Timer();
    this.startTracking();
  }

  startTracking() {
    window.addEventListener('scroll', this.scroll.update.bind(this.scroll), false);
    document.addEventListener(Adapters.vchange, this.timer.update.bind(this.timer), false);
  }
}

export default Manager;
