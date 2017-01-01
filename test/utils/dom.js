import jsdom from 'jsdom';

// setup the simplest document possible
var doc = jsdom.jsdom('<!doctype html><html><body><div id="main" style="height:100px;width:auto" class="main"><p>This is a test.</p></div></body></html>', {
  url: 'http://test.page/',
  done: function (error, w) {
    w.constructor.prototype.resizeTo = function (width, height) {
        this.innerWidth = this.outerWidth = width;
        this.innerHeight = this.outerHeight = height;
    };
    w.resizeTo(100, 200);
  }
});

// get the window object out of the document
var win = doc.defaultView;

win.performance = {
  offset: Date.now(),
  now: function now() {
    return Date.now() - this.offset;
  }
};

win.navigator.sendBeacon = function() {
  // do something
};

win.sessionStorage = {
  getItem: function (key) {
    return this[key];
  },
  setItem: function (key, value) {
    this[key] = value;
  }
};

// set globals for mocha that make access to document and window feel
// natural in the test environment
global.document = doc;
global.window = win;

// take all properties of the window object and also attach it to the
// mocha global object
propagateToGlobal(win)

// from mocha-jsdom https://github.com/rstacruz/mocha-jsdom/blob/master/index.js#L80
function propagateToGlobal (window) {
  for (let key in window) {
    if (!window.hasOwnProperty(key)) continue
    if (key in global) continue

    global[key] = window[key]
  }
}
