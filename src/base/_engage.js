class _engage {

  static get options() {
    return this.options;
  }

  static run(options) {
    if (!options) {
      throw new Error('No options passed');
    }
    if (!options.element) {
      throw new Error('No element option passed');
    }
    return true;
  }

}

export default _engage;
