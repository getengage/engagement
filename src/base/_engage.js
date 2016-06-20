import { Manager } from '../metrics';

let instance = null;

class _engage {

  constructor(options) {
    if (!instance) { instance = this; }
    this.options = options;
    this.manager = new Manager();
  }

  static run(options) {
    if (!options) {
      throw new Error('No options passed');
    }
    if (!options.element) {
      throw new Error('No element option passed');
    }
    return new _engage(options);
  }
}

export default _engage;
