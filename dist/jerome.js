"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.Jerome = void 0;

require("core-js/modules/es6.object.assign");

require("core-js/modules/es6.regexp.to-string");

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

// Jerome
// A tiny JavaScript/REST kind of ORM.
//
// const API = new Jerome('https://example.org');
// const User = API('/users');
//
// const me = User.get(1); //-> GET https://example.org/users/1
//
// me.id; //-> 1
//
// me.name = 'John Doe';
// me.save(); //-> PUT https://example.org/users/1 { "name": "John Doe" }
//
// me.delete(); //-> DELETE https://example.org/users/1
//
// User.create({ name: 'Mary Jane'}); //-> POST https://example.org/users { "name": "Mary Jane" }
// Extract model data from response.
var getData = function getData(response) {
  return response;
}; // Prepare model data to be sent in the request.


var prepareData = function prepareData(model) {
  return model.toJSON();
};

var Jerome =
/*#__PURE__*/
function () {
  function Jerome(url) {
    var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    _classCallCheck(this, Jerome);

    this.url = new URL(url);
    this.options = options;
  }

  _createClass(Jerome, [{
    key: "fetch",
    value: function (_fetch) {
      function fetch(_x) {
        return _fetch.apply(this, arguments);
      }

      fetch.toString = function () {
        return _fetch.toString();
      };

      return fetch;
    }(function (path) {
      var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
      var url = new URL(path, this.url);
      options = Object.assign({}, this.options, options);
      return fetch(url.toString(), options).catch(this.handleError);
    })
  }, {
    key: "handleError",
    value: function handleError(err) {
      throw Error(err);
    }
  }]);

  return Jerome;
}();

exports.Jerome = Jerome;
var _default = Jerome;
exports.default = _default;
