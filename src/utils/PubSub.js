const handlers = [];

class PubSub {

  constructor() {
    this.handlers = handlers;
  }

  subscribe(event, handler, context) {
    const ctx = (typeof context === 'undefined') ? handler : context;
    this.handlers.push({ event, handler: handler.bind(ctx) });
  }

  publish(event) {
    let i;
    for (i = 0; i < this.handlers.length; i += 1) {
      if (this.handlers[i].event === event) {
        this.handlers[i].handler.call();
      }
    }
  }
}

export default PubSub;
