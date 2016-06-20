class Scroll {

  constructor() {
    if (typeof window.pageYOffset !== 'undefined') {
      this.position = [
        window.pageXOffset,
        window.pageYOffset,
      ];
    } else if (typeof document.documentElement.scrollTop !== 'undefined' &&
    document.documentElement.scrollTop > 0) {
      this.position = [
        document.documentElement.scrollLeft,
        document.documentElement.scrollTop,
      ];
    } else if (typeof document.body.scrollTop !== 'undefined') {
      this.position = [
        document.body.scrollLeft,
        document.body.scrollTop,
      ];
    } else {
      throw new Error('Not Supported');
    }
  }

  scrollPos() {
    return this.scrollPos;
  }

  update() {
    this.scrollPos = this.position();
  }

}

export default Scroll;
