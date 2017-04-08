var engage =
/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(global) {'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _base = __webpack_require__(1);
	
	var _base2 = _interopRequireDefault(_base);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	window.engage = _base2.default;
	global.engage = _base2.default;
	exports.default = _base2.default;
	/* WEBPACK VAR INJECTION */}.call(exports, (function() { return this; }())))

/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _engage = __webpack_require__(2);
	
	var _engage2 = _interopRequireDefault(_engage);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	exports.default = _engage2.default;

/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _metrics = __webpack_require__(3);
	
	var _metrics2 = _interopRequireDefault(_metrics);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var instance = null;
	var defaults = {
	  content: 'application/vnd.engage.api+json; charset=UTF-8',
	  url: 'http://api.engage.dev/v1/metrics'
	};
	
	var engage = function () {
	  function engage(options) {
	    _classCallCheck(this, engage);
	
	    if (!instance) {
	      instance = this;
	    }
	    this.options = _extends(defaults, options);
	    this.manager = new _metrics2.default(options);
	    this.emitter();
	  }
	
	  engage.prototype.toJSON = function toJSON() {
	    var data = _extends({ api_key_id: this.options.api_key }, this.options.dimensions, this.manager.inspect());
	    return JSON.stringify({ data: data });
	  };
	
	  engage.prototype.format = function format() {
	    return new window.Blob([this.toJSON()], {
	      type: this.options.content
	    });
	  };
	
	  engage.prototype.emitter = function emitter() {
	    var _this = this;
	
	    setInterval(function () {
	      window.navigator.sendBeacon(_this.options.url, _this.format());
	    }, 2000);
	  };
	
	  engage.run = function run(options) {
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
	  };
	
	  _createClass(engage, null, [{
	    key: 'instance',
	    get: function get() {
	      if (!instance) {
	        throw new Error('Engage is not running');
	      }
	      return instance;
	    },
	    set: function set(val) {
	      if (instance) {
	        instance = val;
	      }
	    }
	  }]);
	
	  return engage;
	}();
	
	exports.default = engage;

/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _Manager = __webpack_require__(4);
	
	var _Manager2 = _interopRequireDefault(_Manager);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	exports.default = _Manager2.default;

/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _tracking = __webpack_require__(5);
	
	var _utils = __webpack_require__(7);
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var Manager = function () {
	  function Manager(options) {
	    _classCallCheck(this, Manager);
	
	    this.options = options;
	    this.timestamp = new Date().toISOString();
	    this.pubsub = new _utils.PubSub();
	    this.scroll = new _tracking.Scroll(options.element);
	    this.session = new _tracking.Session();
	    this.visibility = new _tracking.Visibility();
	    this.startTracking();
	  }
	
	  Manager.prototype.startTracking = function startTracking() {
	    var _this = this;
	
	    window.addEventListener('scroll', function () {
	      return _this.pubsub.publish('Scroll');
	    });
	    document.addEventListener(_utils.Adapters.vchange, function () {
	      return _this.pubsub.publish('Visibility');
	    }, false);
	  };
	
	  Manager.prototype.inspect = function inspect() {
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
	  };
	
	  return Manager;
	}();
	
	exports.default = Manager;

/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.Session = exports.Visibility = exports.Scroll = undefined;
	
	var _Scroll = __webpack_require__(6);
	
	var _Scroll2 = _interopRequireDefault(_Scroll);
	
	var _Visibility = __webpack_require__(11);
	
	var _Visibility2 = _interopRequireDefault(_Visibility);
	
	var _Session = __webpack_require__(12);
	
	var _Session2 = _interopRequireDefault(_Session);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	exports.Scroll = _Scroll2.default;
	exports.Visibility = _Visibility2.default;
	exports.Session = _Session2.default;

/***/ },
/* 6 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _utils = __webpack_require__(7);
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var elements = void 0;
	
	var Scroll = function () {
	  function Scroll(element) {
	    _classCallCheck(this, Scroll);
	
	    this.setContentElements(element);
	    this.update();
	    this.pubsub = new _utils.PubSub();
	    this.pubsub.subscribe('Scroll', this.update, this);
	  }
	
	  Scroll.prototype.setContentElements = function setContentElements(element) {
	    var _this = this;
	
	    elements = _utils.$$.find(element);
	    if (elements.length === 0) throw new Error('No Elements Found');
	    this.top = elements[0].getBoundingClientRect().top;
	    this.bottom = elements[elements.length - 1].getBoundingClientRect().bottom;
	    elements.forEach(function (el) {
	      _this.word_count = (_this.word_count || 0) + el.innerHTML.replace(/<\/?[^>]+(>|$)/g, '').split(' ').length;
	    });
	  };
	
	  Scroll.prototype.update = function update() {
	    var _Adapters$scrollCalc = _utils.Adapters.scrollCalc();
	
	    this.xPos = _Adapters$scrollCalc[0];
	    this.yPos = _Adapters$scrollCalc[1];
	
	    this.elementInViewport = Scroll.elementsInViewport();
	  };
	
	  Scroll.inBounds = function inBounds(el) {
	    var rect = el.getBoundingClientRect();
	    return rect.bottom > 0 && rect.right > 0 && rect.left < (window.innerWidth || document.documentElement.clientWidth) && rect.top < (window.innerHeight || document.documentElement.clientHeight);
	  };
	
	  Scroll.elementsInViewport = function elementsInViewport() {
	    return elements.some(function (el) {
	      return Scroll.inBounds(el);
	    });
	  };
	
	  return Scroll;
	}();
	
	exports.default = Scroll;

/***/ },
/* 7 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.PubSub = exports.Adapters = exports.$$ = undefined;
	
	var _Utils = __webpack_require__(8);
	
	var _Utils2 = _interopRequireDefault(_Utils);
	
	var _Adapters = __webpack_require__(9);
	
	var _Adapters2 = _interopRequireDefault(_Adapters);
	
	var _PubSub = __webpack_require__(10);
	
	var _PubSub2 = _interopRequireDefault(_PubSub);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	exports.$$ = _Utils2.default;
	exports.Adapters = _Adapters2.default;
	exports.PubSub = _PubSub2.default;

/***/ },
/* 8 */
/***/ function(module, exports) {

	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var $$ = function () {
	  function $$() {
	    _classCallCheck(this, $$);
	  }
	
	  $$.find = function find(selector) {
	    return Array.from(document.querySelectorAll(selector));
	  };
	
	  return $$;
	}();
	
	exports.default = $$;

/***/ },
/* 9 */
/***/ function(module, exports) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
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
	
	exports.default = Adapters;

/***/ },
/* 10 */
/***/ function(module, exports) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var handlers = [];
	
	var PubSub = function () {
	  function PubSub() {
	    _classCallCheck(this, PubSub);
	
	    this.handlers = handlers;
	  }
	
	  PubSub.prototype.subscribe = function subscribe(event, handler, context) {
	    var ctx = typeof context === 'undefined' ? handler : context;
	    this.handlers.push({ event: event, handler: handler.bind(ctx) });
	  };
	
	  PubSub.prototype.publish = function publish(event) {
	    var i = void 0;
	    for (i = 0; i < this.handlers.length; i += 1) {
	      if (this.handlers[i].event === event) {
	        this.handlers[i].handler.call();
	      }
	    }
	  };
	
	  return PubSub;
	}();
	
	exports.default = PubSub;

/***/ },
/* 11 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _utils = __webpack_require__(7);
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var Visibility = function () {
	  function Visibility() {
	    _classCallCheck(this, Visibility);
	
	    this.is_visible = true;
	    this.pubsub = new _utils.PubSub();
	    this.pubsub.subscribe('Visibility', this.update, this);
	  }
	
	  Visibility.prototype.update = function update() {
	    this.is_visible = window.document[_utils.Adapters.vhidden];
	  };
	
	  return Visibility;
	}();
	
	exports.default = Visibility;

/***/ },
/* 12 */
/***/ function(module, exports) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var Session = function () {
	  function Session() {
	    _classCallCheck(this, Session);
	
	    this.session_id = Session.sessionId();
	    this.referrer = Session.referrer();
	    this.source_url = document.URL.replace(/\/$/, '');
	  }
	
	  Session.sessionId = function sessionId() {
	    var sessionId = window.sessionStorage.getItem('__engage_session');
	    if (sessionId == null) {
	      var newId = Session.idTemplate();
	      window.sessionStorage.setItem('__engage_session', newId);
	      return newId;
	    }
	    return sessionId;
	  };
	
	  Session.referrer = function referrer() {
	    var url = document.referrer.replace(/\/$/, '');
	    return url.match(location.hostname) ? url : '';
	  };
	
	  Session.idTemplate = function idTemplate() {
	    return '_' + Math.random().toString(36).substr(2, 9) + '_' + Date.now();
	  };
	
	  return Session;
	}();
	
	exports.default = Session;

/***/ }
/******/ ]);
//# sourceMappingURL=engage.js.map