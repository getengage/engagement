import { Scroll, Timer } from '../tracking';
import { Adapters } from '../utils/';

class Manager {

  constructor() {
    console.log(this);
    this.scroll = new Scroll();
    this.timer = new Timer();
    this.startTracking();
  }

  startTracking() {
    console.log(this.timer);
    window.addEventListener('scroll', this.scroll.update.bind(this.scroll), false);
    document.addEventListener(Adapters.vchange, this.timer.update.bind(this.timer), false);
  }
}

export default Manager;
