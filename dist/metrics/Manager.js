"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Manager = function Manager() {
    _classCallCheck(this, Manager);

    operative({
        something: 123,
        doStuff: function doStuff() {
            this.something += 456;
        }
    });
};

exports.default = Manager;