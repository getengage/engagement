import { Scroll, Timer } from '../tracking';
import { Adapters } from '../utils/';

class Manager {

  constructor() {
    this.created_at = Date.now();
    this.scroll = new Scroll();
    this.timer = new Timer();
    this.referrer = this.referrer();
    this.startTracking();
  }

  startTracking() {
    window.addEventListener('scroll', this.scroll.update.bind(this.scroll), false);
    document.addEventListener(Adapters.vchange, this.timer.update.bind(this.timer), false);
  }

  referrer() {
    const referrer = document.referrer;
    return referrer.match(location.hostname) ? referrer : '';
  }

  inspect() {
    return {
      created_at: this.created_at,
      referrer: this.referrer,
      scroll: this.scroll.toJSON(),
      timer: this.timer.toJSON(),
    };
  }

}

export default Manager;
