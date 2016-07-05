import { Scroll, Session, Visibility } from '../tracking';
import { Adapters } from '../utils/';

class Manager {

  constructor() {
    this.created_at = Date.now();
    this.scroll = new Scroll();
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
      created_at: this.created_at,
      session_id: this.session.session_id,
      referrer: this.session.referrer,
      x_pos: this.scroll.xPos,
      y_pos: this.scrol.yPos,
      is_visible: this.visibility.is_visible,
      source_url: this.session.source_url,
    };
  }

}

export default Manager;
