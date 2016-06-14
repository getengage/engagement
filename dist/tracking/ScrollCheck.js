'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Scroll = function () {
  function Scroll() {
    _classCallCheck(this, Scroll);

    this.scrollPos = [];
  }

  _createClass(Scroll, [{
    key: 'getScrollPos',
    value: function getScrollPos() {
      var position = [0, 0];

      if (typeof window.pageYOffset !== 'undefined') {
        position = [window.pageXOffset, window.pageYOffset];
      } else if (typeof document.documentElement.scrollTop !== 'undefined' && document.documentElement.scrollTop > 0) {
        position = [document.documentElement.scrollLeft, document.documentElement.scrollTop];
      } else if (typeof document.body.scrollTop !== 'undefined') {
        position = [document.body.scrollLeft, document.body.scrollTop];
      }
      return position;
    }
  }, {
    key: 'scrollPos',
    value: function scrollPos() {
      return this.scrollPos;
    }
  }, {
    key: 'setScrollPos',
    value: function setScrollPos() {
      this.scrollPos = this.getScrollPos();
    }
  }]);

  return Scroll;
}();

exports.default = Scroll;