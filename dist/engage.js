var engage = (function () {
'use strict';

var classCallCheck = function (instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
};

var createClass = function () {
  function defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor) descriptor.writable = true;
      Object.defineProperty(target, descriptor.key, descriptor);
    }
  }

  return function (Constructor, protoProps, staticProps) {
    if (protoProps) defineProperties(Constructor.prototype, protoProps);
    if (staticProps) defineProperties(Constructor, staticProps);
    return Constructor;
  };
}();







var _extends = Object.assign || function (target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = arguments[i];

    for (var key in source) {
      if (Object.prototype.hasOwnProperty.call(source, key)) {
        target[key] = source[key];
      }
    }
  }

  return target;
};

var $$ = function () {
  function $$() {
    classCallCheck(this, $$);
  }

  createClass($$, null, [{
    key: "find",
    value: function find(selector) {
      return Array.from(document.querySelectorAll(selector));
    }
  }]);
  return $$;
}();

var Adapters = {};

Adapters.scrollCalc = function () {
  if (typeof window.pageYOffset === 'undefined') throw new Error('Not Supported');
  return [window.pageXOffset, window.pageYOffset];
};

if (typeof document.hidden !== 'undefined') {
  // Opera 12.10 and Firefox 18 and later support
  Adapters.vhidden = 'hidden';
  Adapters.vchange = 'visibilitychange';
} else if (typeof document.mozHidden !== 'undefined') {
  Adapters.vhidden = 'mozHidden';
  Adapters.vchange = 'mozvisibilitychange';
} else if (typeof document.msHidden !== 'undefined') {
  Adapters.vhidden = 'msHidden';
  Adapters.vchange = 'msvisibilitychange';
} else if (typeof document.webkitHidden !== 'undefined') {
  Adapters.vhidden = 'webkitHidden';
  Adapters.vchange = 'webkitvisibilitychange';
}

var handlers = [];

var PubSub = function () {
  function PubSub() {
    classCallCheck(this, PubSub);

    this.handlers = handlers;
  }

  createClass(PubSub, [{
    key: 'subscribe',
    value: function subscribe(event, handler, context) {
      var ctx = typeof context === 'undefined' ? handler : context;
      this.handlers.push({ event: event, handler: handler.bind(ctx) });
    }
  }, {
    key: 'publish',
    value: function publish(event) {
      var i = void 0;
      for (i = 0; i < this.handlers.length; i += 1) {
        if (this.handlers[i].event === event) {
          this.handlers[i].handler.call();
        }
      }
    }
  }]);
  return PubSub;
}();

var elements = void 0;

var Scroll = function () {
  function Scroll(element) {
    classCallCheck(this, Scroll);

    this.setContentElements(element);
    this.update();
    this.pubsub = new PubSub();
    this.pubsub.subscribe('Scroll', this.update, this);
  }

  createClass(Scroll, [{
    key: 'setContentElements',
    value: function setContentElements(element) {
      var _this = this;

      elements = $$.find(element);
      if (elements.length === 0) throw new Error('No Elements Found');
      this.top = elements[0].getBoundingClientRect().top;
      this.bottom = elements[elements.length - 1].getBoundingClientRect().bottom;
      elements.forEach(function (el) {
        _this.word_count = (_this.word_count || 0) + el.innerHTML.replace(/<\/?[^>]+(>|$)/g, '').split(' ').length;
      });
    }
  }, {
    key: 'update',
    value: function update() {
      var newCalc = Adapters.scrollCalc();
      this.xPos = newCalc[0];
      this.yPos = newCalc[1];
      this.elementInViewport = Scroll.elementsInViewport();
    }
  }], [{
    key: 'inBounds',
    value: function inBounds(el) {
      var rect = el.getBoundingClientRect();
      return rect.bottom > 0 && rect.right > 0 && rect.left < (window.innerWidth || document.documentElement.clientWidth) && rect.top < (window.innerHeight || document.documentElement.clientHeight);
    }
  }, {
    key: 'elementsInViewport',
    value: function elementsInViewport() {
      return elements.some(function (el) {
        return Scroll.inBounds(el);
      });
    }
  }]);
  return Scroll;
}();

var Visibility = function () {
  function Visibility() {
    classCallCheck(this, Visibility);

    this.is_visible = true;
    this.pubsub = new PubSub();
    this.pubsub.subscribe('Visibility', this.update, this);
  }

  createClass(Visibility, [{
    key: 'update',
    value: function update() {
      this.is_visible = window.document[Adapters.vhidden];
    }
  }]);
  return Visibility;
}();

var Session = function () {
  function Session() {
    classCallCheck(this, Session);

    this.session_id = Session.sessionId();
    this.referrer = Session.referrer();
    this.source_url = document.URL.replace(/\/$/, '');
  }

  createClass(Session, null, [{
    key: 'sessionId',
    value: function sessionId() {
      var sessionId = window.sessionStorage.getItem('__engage_session');
      if (sessionId == null) {
        var newId = Session.idTemplate();
        window.sessionStorage.setItem('__engage_session', newId);
        return newId;
      }
      return sessionId;
    }
  }, {
    key: 'referrer',
    value: function referrer() {
      var url = document.referrer.replace(/\/$/, '');
      return url.match(location.hostname) ? url : '';
    }
  }, {
    key: 'idTemplate',
    value: function idTemplate() {
      return '_' + Math.random().toString(36).substr(2, 9) + '_' + Date.now();
    }
  }]);
  return Session;
}();

var Manager$1 = function () {
  function Manager(options) {
    classCallCheck(this, Manager);

    this.options = options;
    this.timestamp = new Date().toISOString();
    this.pubsub = new PubSub();
    this.scroll = new Scroll(options.element);
    this.session = new Session();
    this.visibility = new Visibility();
    this.startTracking();
  }

  createClass(Manager, [{
    key: 'startTracking',
    value: function startTracking() {
      var _this = this;

      window.addEventListener('scroll', function () {
        return _this.pubsub.publish('Scroll');
      });
      document.addEventListener(Adapters.vchange, function () {
        return _this.pubsub.publish('Visibility');
      }, false);
    }
  }, {
    key: 'inspect',
    value: function inspect() {
      return {
        timestamp: this.timestamp,
        session_id: this.session.session_id,
        referrer: this.session.referrer,
        x_pos: this.scroll.xPos,
        y_pos: this.scroll.yPos,
        top: this.scroll.top,
        bottom: this.scroll.bottom,
        word_count: this.scroll.word_count,
        is_visible: this.visibility.is_visible,
        source_url: this.session.source_url,
        in_viewport: this.scroll.elementInViewport
      };
    }
  }]);
  return Manager;
}();

var commonjsGlobal = typeof window !== 'undefined' ? window : typeof global !== 'undefined' ? global : typeof self !== 'undefined' ? self : {};





function createCommonjsModule(fn, module) {
	return module = { exports: {} }, fn(module, module.exports), module.exports;
}

var sendbeacon = createCommonjsModule(function (module, exports) {
(function(root) {
  'use strict';

  function sendBeacon(url, data, _settings) {
    var xhr = ('XMLHttpRequest' in window) ? new XMLHttpRequest() : new ActiveXObject('Microsoft.XMLHTTP');
    xhr.open('POST', url, false);
    xhr.withCredentials = true;
    xhr.setRequestHeader('Accept', '*/*');
    if (typeof data === 'string') {
      xhr.setRequestHeader('Content-Type', 'text/plain;charset=UTF-8');
      xhr.responseType = 'text/plain';
    } else if (Object.prototype.toString.call(data) === '[object Blob]') {
      if (data.type) {
        xhr.setRequestHeader('Content-Type', data.type);
      }
    }

    if (typeof _settings === 'object') {
      if (!isNaN(_settings.timeout)) {
        // xhr.timeout doesn't work for synchronous requests
        setTimeout(function() {
          if (xhr.readyState !== 4) {
            xhr.abort();
          }
        }, _settings.timeout);
        
      }
    }

    xhr.send(data);
    return true;
  }

  {
    if ('object' !== 'undefined' && module.exports) {
      exports = module.exports = sendBeacon;
    }
    exports.sendBeacon = sendBeacon;
  }
})(commonjsGlobal);
});

var sendbeacon_1 = sendbeacon.sendBeacon;

var instance = null;
var defaults$$1 = {
  content: 'application/vnd.engage.api+json; charset=UTF-8',
  url: 'http://api.engage.dev/v1/metrics'
};

var engage$2 = function () {
  function engage(options) {
    classCallCheck(this, engage);

    if (!instance) {
      instance = this;
    }
    this.options = _extends(defaults$$1, options);
    this.manager = new Manager$1(options);
    this.emitter();
  }

  createClass(engage, [{
    key: 'toJSON',
    value: function toJSON() {
      var data = _extends({ api_key_id: this.options.api_key }, this.options.dimensions, this.manager.inspect());
      return JSON.stringify({ data: data });
    }
  }, {
    key: 'format',
    value: function format() {
      return new window.Blob([this.toJSON()], {
        type: this.options.content
      });
    }
  }, {
    key: 'emitter',
    value: function emitter() {
      var _this = this;

      setInterval(function () {
        sendbeacon_1(_this.options.url, _this.format());
      }, 2000);
    }
  }], [{
    key: 'run',
    value: function run(options) {
      if (!options) {
        throw new Error('No options passed');
      }
      if (!options.api_key) {
        throw new Error('No API Key passed');
      }
      if (!options.element) {
        throw new Error('No element option passed');
      }
      return new engage(options); // eslint-disable-line new-cap
    }
  }, {
    key: 'instance',
    get: function get$$1() {
      if (!instance) {
        throw new Error('Engage is not running');
      }
      return instance;
    },
    set: function set$$1(val) {
      if (instance) {
        instance = val;
      }
    }
  }]);
  return engage;
}();

window.engage = engage$2;

return engage$2;

}());

//# sourceMappingURL=engage.js.map
