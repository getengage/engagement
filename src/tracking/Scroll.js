class Scroll {

  constructor(element) {
    if (typeof window.pageYOffset !== 'undefined') {
      this.scrollCalc = function scrollCal() {
        return [window.pageXOffset, window.pageYOffset];
      };
    } else if (typeof document.documentElement.scrollTop !== 'undefined' &&
    document.documentElement.scrollTop > 0) {
      this.scrollCalc = function scrollCalc() {
        return [document.documentElement.scrollLeft, document.documentElement.scrollTop];
      };
    } else if (typeof document.body.scrollTop !== 'undefined') {
      this.scrollCalc = function scrollCalc() {
        return [document.body.scrollLeft, document.body.scrollTop];
      };
    } else {
      throw new Error('Not Supported');
    }
    this.contentElements = document.getElementsByClassName(element);
    this.upperContentBound = this.contentElements[0];
    this.lowerContentBound = this.contentElements[this.contentElements.length - 1];
    this.update();
  }

  update() {
    [this.xPos, this.yPos] = this.scrollCalc();
    this.elementInViewport = this.elementsInViewport();
  }

  elementsInViewport() {
    const viewportChecks = Array.from(this.contentElements, (el) => {
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
