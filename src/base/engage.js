import { Manager } from '../metrics';

let instance = null;

class engage {

  constructor(options) {
    if (!instance) { instance = this; }
    this.options = options;
    this.manager = new Manager();
  }

  static get instance() {
    if (!instance) { throw new Error('Engage is not running'); }
    return instance;
  }

  static set instance(val) {
    if (instance) { instance = val; }
  }

  static run(options) {
    if (!options) { throw new Error('No options passed'); }
    if (!options.element) { throw new Error('No element option passed'); }
    return new engage(options); // eslint-disable-line new-cap
  }
}

export default engage;
