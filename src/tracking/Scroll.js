import { Adapters, PubSub } from '../utils/';

class Scroll {

  constructor(element) {
    this.word_count = 0;
    this.viewportChecks = [];
    this.setContentElements(element);
    this.update();
    this.pubsub = new PubSub();
    this.pubsub.subscribe('Scroll', this.update, this);
  }

  setContentElements(element) {
    const self = this;
    const elements = document.querySelectorAll(element);
    if (elements.length === 0) {
      throw new Error('No Elements Found');
    } else {
      Object.keys(elements).forEach((key) => {
        self.word_count += elements[key].innerHTML.replace(/<\/?[^>]+(>|$)/g, '').split(' ').length;
        self.viewportChecks.push(elements[key]);
      });
      self.top = elements[0].getBoundingClientRect().top;
      self.bottom = elements[elements.length - 1].getBoundingClientRect().bottom;
    }
  }

  static inBounds(el) {
    const rect = el.getBoundingClientRect();
    return rect.bottom > 0 &&
      rect.right > 0 &&
      rect.left < (window.innerWidth || document.documentElement.clientWidth) &&
      rect.top < (window.innerHeight || document.documentElement.clientHeight);
  }

  update() {
    [this.xPos, this.yPos] = Adapters.scrollCalc();
    this.elementInViewport = this.elementsInViewport();
  }

  elementsInViewport() {
    return this.viewportChecks.some(el => Scroll.inBounds(el));
  }
}

module.exports = Scroll;
