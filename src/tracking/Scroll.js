import { $$, Adapters, PubSub } from '../utils/';

let elements;

class Scroll {

  constructor(element) {
    this.setContentElements(element);
    this.update();
    this.pubsub = new PubSub();
    this.pubsub.subscribe('Scroll', this.update, this);
  }

  setContentElements(element) {
    elements = $$.find(element);
    if (elements.length === 0) throw new Error('No Elements Found');
    this.top = elements[0].getBoundingClientRect().top;
    this.bottom = elements[elements.length - 1].getBoundingClientRect().bottom;
    elements.forEach((el) => {
      this.word_count = (this.word_count || 0) + el.innerHTML.replace(/<\/?[^>]+(>|$)/g, '').split(' ').length;
    });
  }

  update() {
    [this.xPos, this.yPos] = Adapters.scrollCalc();
    this.elementInViewport = Scroll.elementsInViewport();
  }

  static inBounds(el) {
    const rect = el.getBoundingClientRect();
    return rect.bottom > 0 &&
      rect.right > 0 &&
      rect.left < (window.innerWidth || document.documentElement.clientWidth) &&
      rect.top < (window.innerHeight || document.documentElement.clientHeight);
  }

  static elementsInViewport() {
    return elements.some(el => Scroll.inBounds(el));
  }
}

module.exports = Scroll;
