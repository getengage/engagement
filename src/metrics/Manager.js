import { Scroll, Session, Visibility } from '../tracking';
import { Adapters } from '../utils/';

class Manager {

  constructor(options) {
    this.options = options;
    this.timestamp = Date.now();
    this.scroll = new Scroll(options.element);
    this.session = new Session();
    this.visibility = new Visibility();
    this.startTracking();
  }

  startTracking() {
    window.addEventListener('scroll', this.scroll.update.bind(this.scroll), false);
    document.addEventListener(
      Adapters.vchange, this.visibility.update.bind(this.visibility), false
    );
  }

  inspect() {
    return {
      timestamp: this.timestamp,
      session_id: this.session.session_id,
      referrer: this.session.referrer,
      x_pos: this.scroll.xPos,
      y_pos: this.scroll.yPos,
      is_visible: this.visibility.is_visible,
      source_url: this.session.source_url,
      in_viewport: this.scroll.elementInViewport,
    };
  }

}

module.exports = Manager;
