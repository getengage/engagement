import * as Beacon from 'navigator.sendbeacon';
import Manager from '../metrics';

let instance = null;
const defaults = {
  content: 'application/vnd.engage.api+json; charset=UTF-8',
  url: 'http://api.engage.dev/v1/metrics',
};

class engage {

  constructor(options) {
    if (!instance) { instance = this; }
    this.options = Object.assign(defaults, options);
    this.manager = new Manager(options);
    this.emitter();
  }

  toJSON() {
    const data = Object.assign(
      { api_key_id: this.options.api_key },
      this.options.dimensions,
      this.manager.inspect(),
    );
    return JSON.stringify({ data });
  }

  format() {
    return new window.Blob([this.toJSON()], {
      type: this.options.content,
    });
  }

  emitter() {
    setInterval(() => {
      Beacon.sendBeacon(this.options.url, this.format());
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

export default engage;
