let instance = null;

class _engage {

  constructor() {
    if (!instance) { instance = this; }
    return instance;
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
