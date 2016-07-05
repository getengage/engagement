import { Adapters } from '../utils/';

class Visibility {

  constructor() {
    this.is_visible = true;
  }

  update() {
    this.is_visible = window.document[Adapters.vhidden];
  }

}

module.exports = Visibility;
