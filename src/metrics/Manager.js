import { Scroll, Session, Visibility } from '../tracking';
import { Adapters, PubSub } from '../utils/';

class Manager {

  constructor(options) {
    this.options = options;
    this.timestamp = new Date().toISOString();
    this.pubsub = new PubSub();
    this.scroll = new Scroll(options.element);
    this.session = new Session();
    this.visibility = new Visibility();
    this.startTracking();
  }

  startTracking() {
    window.addEventListener('scroll', () => this.pubsub.publish('Scroll'));
    document.addEventListener(Adapters.vchange, () => this.pubsub.publish('Visibility'), false);
  }

  inspect() {
    return {
      timestamp: this.timestamp,
      session_id: this.session.session_id,
      referrer: this.session.referrer,
      x_pos: this.scroll.xPos,
      y_pos: this.scroll.yPos,
      top: this.scroll.top,
      bottom: this.scroll.bottom,
      word_count: this.scroll.word_count,
      is_visible: this.visibility.is_visible,
      source_url: this.session.source_url,
      in_viewport: this.scroll.elementInViewport,
    };
  }

}

export default Manager;
