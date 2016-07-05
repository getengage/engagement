import { Manager } from '../metrics';
import { $$ } from '../utils';

let instance = null;
const defaults = {
  content: 'application/vnd.engage.api+json; charset=UTF-8',
  url: 'https://example.localtunnel.me/v1/reports',
};

class engage {

  constructor(options) {
    if (!instance) { instance = this; }
    this.options = $$.extend(defaults, options);
    this.manager = new Manager();
    this.emitter();
  }

  toJSON() {
    const data = $$.extend({ api_key: this.options.api_key }, { data: this.manager.inspect() });
    return JSON.stringify(data);
  }

  format() {
    return new Blob(
      [this.toJSON()], { type: this.options.content }
    );
  }

  emitter() {
    setInterval(() => {
      window.navigator.sendBeacon(this.options.url, this.format());
    }, 2000);
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
    if (!options.api_key) { throw new Error('No API Key passed'); }
    if (!options.element) { throw new Error('No element option passed'); }
    return new engage(options); // eslint-disable-line new-cap
  }
}

module.exports = engage;
