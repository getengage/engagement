class Scroll {

  constructor(element) {
    this.word_count = 0;
    this.viewportChecks = [];
    this.setScrollCalc();
    this.setContentElements(element);
    this.update();
  }

  setScrollCalc() {
    if (typeof window.pageYOffset !== 'undefined') {
      this.scrollCalc = () =>
        ([window.pageXOffset, window.pageYOffset]);
    } else if (typeof document.documentElement.scrollTop !== 'undefined' &&
    document.documentElement.scrollTop > 0) {
      this.scrollCalc = () =>
        ([document.documentElement.scrollLeft, document.documentElement.scrollTop]);
    } else if (typeof document.body.scrollTop !== 'undefined') {
      this.scrollCalc = () =>
        ([document.body.scrollLeft, document.body.scrollTop]);
    } else {
      throw new Error('Not Supported');
    }
  }

  setContentElements(element) {
    const self = this;
    const elements = document.getElementsByClassName(element);
    if (elements.length === 0) {
      throw new Error('No Elements Found');
    } else {
      Object.keys(elements).forEach((key) => {
        const rect = elements[key].getBoundingClientRect();
        self.word_count += elements[key].innerHTML.replace(/<\/?[^>]+(>|$)/g, '').split(' ').length;
        self.viewportChecks.push(
            rect.top >= 0 &&
            rect.left >= 0 &&
            rect.bottom <= (window.innerHeight || document.documentElement
                .clientHeight) &&
            rect.right <= (window.innerWidth || document.documentElement
                .clientWidth)
        );
      });
      self.top = elements[0].getBoundingClientRect().top;
      self.bottom = elements[elements.length - 1].getBoundingClientRect().bottom;
    }
  }

  update() {
    [this.xPos, this.yPos] = this.scrollCalc();
    this.elementInViewport = this.elementsInViewport();
  }

  elementsInViewport() {
    return this.viewportChecks.some(x => x === true);
  }
}

module.exports = Scroll;
