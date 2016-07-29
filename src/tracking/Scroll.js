class Scroll {

  constructor(element) {
    this.elementClass = element;
    this.findScrollCalcVars()
      .then(this.setScrollCalc.bind(this))
      .then(this.setContentElements.bind(this))
      .then(() => {
        this.update();
      })
      .catch((error) => {
        throw new Error(error);
      });
  }

  findScrollCalcVars() {
    return new Promise((resolve, reject) => {
      if (typeof window.pageYOffset !== 'undefined') {
        resolve(() => ([window.pageXOffset, window.pageYOffset]));
      } else if (typeof document.documentElement.scrollTop !== 'undefined' &&
      document.documentElement.scrollTop > 0) {
        resolve(() => ([document.documentElement.scrollLeft, document.documentElement.scrollTop]));
      } else if (typeof document.body.scrollTop !== 'undefined') {
        resolve(() => ([document.body.scrollLeft, document.body.scrollTop]));
      } else {
        reject('Not Supported');
      }
    });
  }

  setScrollCalc(fn) {
    const self = this;
    return new Promise((resolve) => {
      self.scrollCalc = fn; resolve();
    });
  }

  setContentElements() {
    const self = this;
    return new Promise((resolve, reject) => {
      self.elements = document.getElementsByClassName(self.elementClass);
      if (self.elements.length === 0) {
        reject('No Elements Found');
      } else {
        self.top = self.elements[0].getBoundingClientRect().top;
        self.bottom = self.elements[self.elements.length - 1].getBoundingClientRect().bottom;
        resolve();
      }
    });
  }

  update() {
    [this.xPos, this.yPos] = this.scrollCalc();
    this.elementInViewport = this.elementsInViewport();
  }

  elementsInViewport() {
    const viewportChecks = Array.from(this.elements, (el) => {
      const rect = el.getBoundingClientRect();
      return (
          rect.top >= 0 &&
          rect.left >= 0 &&
          rect.bottom <= (window.innerHeight || document.documentElement
              .clientHeight) &&
          rect.right <= (window.innerWidth || document.documentElement
              .clientWidth)
      );
    });
    return viewportChecks.some(x => x === true);
  }
}

module.exports = Scroll;
