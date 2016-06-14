'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var PubSub = function () {
  function PubSub() {
    _classCallCheck(this, PubSub);

    this.handlers = [];
  }

  _createClass(PubSub, [{
    key: 'subscribe',
    value: function subscribe(event, handler, context) {
      var ctx = typeof context === 'undefined' ? handler : context;
      this.handlers.push({ event: event, handler: handler.bind(ctx) });
    }
  }, {
    key: 'publish',
    value: function publish(event) {
      var i = void 0;
      for (i = 0; i < this.handlers.length; i++) {
        if (this.handlers[i].event === event) {
          this.handlers[i].handler.call();
        }
      }
    }
  }]);

  return PubSub;
}();

exports.default = PubSub;