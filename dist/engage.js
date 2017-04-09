var engage = function() {
    "use strict";
    var e = ("undefined" != typeof window ? window : "undefined" != typeof global ? global : "undefined" != typeof self && self, 
    function(e, t) {
        return t = {
            exports: {}
        }, e(t, t.exports), t.exports;
    }(function(e, t) {
        !function(n) {
            function i(e, t, n) {
                var i = "XMLHttpRequest" in window ? new XMLHttpRequest() : new ActiveXObject("Microsoft.XMLHTTP");
                return i.open("POST", e, !1), i.withCredentials = !0, i.setRequestHeader("Accept", "*/*"), 
                "string" == typeof t ? (i.setRequestHeader("Content-Type", "text/plain;charset=UTF-8"), 
                i.responseType = "text/plain") : "[object Blob]" === Object.prototype.toString.call(t) && t.type && i.setRequestHeader("Content-Type", t.type), 
                "object" == typeof n && (isNaN(n.timeout) || setTimeout(function() {
                    4 !== i.readyState && i.abort();
                }, n.timeout)), i.send(t), !0;
            }
            e.exports && (t = e.exports = i), t.sendBeacon = i;
        }();
    })), t = e.sendBeacon, n = function(e, t) {
        if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function");
    }, i = function() {
        function e(e, t) {
            for (var n = 0; n < t.length; n++) {
                var i = t[n];
                i.enumerable = i.enumerable || !1, i.configurable = !0, "value" in i && (i.writable = !0), 
                Object.defineProperty(e, i.key, i);
            }
        }
        return function(t, n, i) {
            return n && e(t.prototype, n), i && e(t, i), t;
        };
    }(), o = Object.assign || function(e) {
        for (var t = 1; t < arguments.length; t++) {
            var n = arguments[t];
            for (var i in n) Object.prototype.hasOwnProperty.call(n, i) && (e[i] = n[i]);
        }
        return e;
    }, s = function() {
        function e() {
            n(this, e);
        }
        return i(e, null, [ {
            key: "find",
            value: function(e) {
                return Array.from(document.querySelectorAll(e));
            }
        } ]), e;
    }(), r = {};
    r.scrollCalc = function() {
        if (void 0 === window.pageYOffset) throw new Error("Not Supported");
        return [ window.pageXOffset, window.pageYOffset ];
    }, void 0 !== document.hidden ? (r.vhidden = "hidden", r.vchange = "visibilitychange") : void 0 !== document.mozHidden ? (r.vhidden = "mozHidden", 
    r.vchange = "mozvisibilitychange") : void 0 !== document.msHidden ? (r.vhidden = "msHidden", 
    r.vchange = "msvisibilitychange") : void 0 !== document.webkitHidden && (r.vhidden = "webkitHidden", 
    r.vchange = "webkitvisibilitychange");
    var u = [], a = function() {
        function e() {
            n(this, e), this.handlers = u;
        }
        return i(e, [ {
            key: "subscribe",
            value: function(e, t, n) {
                var i = void 0 === n ? t : n;
                this.handlers.push({
                    event: e,
                    handler: t.bind(i)
                });
            }
        }, {
            key: "publish",
            value: function(e) {
                var t = void 0;
                for (t = 0; t < this.handlers.length; t += 1) this.handlers[t].event === e && this.handlers[t].handler.call();
            }
        } ]), e;
    }(), c = void 0, l = function() {
        function e(t) {
            n(this, e), this.setContentElements(t), this.update(), this.pubsub = new a(), this.pubsub.subscribe("Scroll", this.update, this);
        }
        return i(e, [ {
            key: "setContentElements",
            value: function(e) {
                var t = this;
                if (c = s.find(e), 0 === c.length) throw new Error("No Elements Found");
                this.top = c[0].getBoundingClientRect().top, this.bottom = c[c.length - 1].getBoundingClientRect().bottom, 
                c.forEach(function(e) {
                    t.word_count = (t.word_count || 0) + e.innerHTML.replace(/<\/?[^>]+(>|$)/g, "").split(" ").length;
                });
            }
        }, {
            key: "update",
            value: function() {
                var t = r.scrollCalc();
                this.xPos = t[0], this.yPos = t[1], this.elementInViewport = e.elementsInViewport();
            }
        } ], [ {
            key: "inBounds",
            value: function(e) {
                var t = e.getBoundingClientRect();
                return t.bottom > 0 && t.right > 0 && t.left < (window.innerWidth || document.documentElement.clientWidth) && t.top < (window.innerHeight || document.documentElement.clientHeight);
            }
        }, {
            key: "elementsInViewport",
            value: function() {
                return c.some(function(t) {
                    return e.inBounds(t);
                });
            }
        } ]), e;
    }(), d = function() {
        function e() {
            n(this, e), this.is_visible = !0, this.pubsub = new a(), this.pubsub.subscribe("Visibility", this.update, this);
        }
        return i(e, [ {
            key: "update",
            value: function() {
                this.is_visible = window.document[r.vhidden];
            }
        } ]), e;
    }(), h = function() {
        function e() {
            n(this, e), this.session_id = e.sessionId(), this.referrer = e.referrer(), this.source_url = document.URL.replace(/\/$/, "");
        }
        return i(e, null, [ {
            key: "sessionId",
            value: function() {
                var t = window.sessionStorage.getItem("__engage_session");
                if (null == t) {
                    var n = e.idTemplate();
                    return window.sessionStorage.setItem("__engage_session", n), n;
                }
                return t;
            }
        }, {
            key: "referrer",
            value: function() {
                var e = document.referrer.replace(/\/$/, "");
                return e.match(location.hostname) ? e : "";
            }
        }, {
            key: "idTemplate",
            value: function() {
                return "_" + Math.random().toString(36).substr(2, 9) + "_" + Date.now();
            }
        } ]), e;
    }(), f = function() {
        function e(t) {
            n(this, e), this.options = t, this.timestamp = new Date().toISOString(), this.pubsub = new a(), 
            this.scroll = new l(t.element), this.session = new h(), this.visibility = new d(), 
            this.startTracking();
        }
        return i(e, [ {
            key: "startTracking",
            value: function() {
                var e = this;
                window.addEventListener("scroll", function() {
                    return e.pubsub.publish("Scroll");
                }), document.addEventListener(r.vchange, function() {
                    return e.pubsub.publish("Visibility");
                }, !1);
            }
        }, {
            key: "inspect",
            value: function() {
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
        } ]), e;
    }(), p = null, v = {
        content: "application/vnd.engage.api+json; charset=UTF-8",
        url: "http://api.engage.dev/v1/metrics"
    }, w = function() {
        function e(t) {
            n(this, e), p || (p = this), this.options = o(v, t), this.manager = new f(t), this.emitter();
        }
        return i(e, [ {
            key: "toJSON",
            value: function() {
                var e = o({
                    api_key_id: this.options.api_key
                }, this.options.dimensions, this.manager.inspect());
                return JSON.stringify({
                    data: e
                });
            }
        }, {
            key: "format",
            value: function() {
                return new window.Blob([ this.toJSON() ], {
                    type: this.options.content
                });
            }
        }, {
            key: "emitter",
            value: function() {
                var e = this;
                setInterval(function() {
                    t(e.options.url, e.format());
                }, 2e3);
            }
        } ], [ {
            key: "run",
            value: function(t) {
                if (!t) throw new Error("No options passed");
                if (!t.api_key) throw new Error("No API Key passed");
                if (!t.element) throw new Error("No element option passed");
                return new e(t);
            }
        }, {
            key: "instance",
            get: function() {
                if (!p) throw new Error("Engage is not running");
                return p;
            },
            set: function(e) {
                p && (p = e);
            }
        } ]), e;
    }();
    return window.engage = w, w;
}();

//# sourceMappingURL=engage.js.map
