import { Adapters, PubSub } from '../utils/';

class Visibility {

  constructor() {
    this.is_visible = true;
    this.pubsub = new PubSub();
    this.pubsub.subscribe('Visibility', this.update, this);
  }

  update() {
    this.is_visible = window.document[Adapters.vhidden];
  }

}

module.exports = Visibility;
