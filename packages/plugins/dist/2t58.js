'use strict';

var qs = require('qs');
var cheerio = require('cheerio');
var axios = require('axios');

function _arrayLikeToArray(r, a) {
  (null == a || a > r.length) && (a = r.length);
  for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e];
  return n;
}
function _arrayWithHoles(r) {
  if (Array.isArray(r)) return r;
}
function asyncGeneratorStep(n, t, e, r, o, a, c) {
  try {
    var i = n[a](c),
      u = i.value;
  } catch (n) {
    return void e(n);
  }
  i.done ? t(u) : Promise.resolve(u).then(r, o);
}
function _asyncToGenerator(n) {
  return function () {
    var t = this,
      e = arguments;
    return new Promise(function (r, o) {
      var a = n.apply(t, e);
      function _next(n) {
        asyncGeneratorStep(a, r, o, _next, _throw, "next", n);
      }
      function _throw(n) {
        asyncGeneratorStep(a, r, o, _next, _throw, "throw", n);
      }
      _next(void 0);
    });
  };
}
function _defineProperty(e, r, t) {
  return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, {
    value: t,
    enumerable: true,
    configurable: true,
    writable: true
  }) : e[r] = t, e;
}
function _iterableToArray(r) {
  if ("undefined" != typeof Symbol && null != r[Symbol.iterator] || null != r["@@iterator"]) return Array.from(r);
}
function _iterableToArrayLimit(r, l) {
  var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"];
  if (null != t) {
    var e,
      n,
      i,
      u,
      a = [],
      f = true,
      o = false;
    try {
      if (i = (t = t.call(r)).next, 0 === l) {
        if (Object(t) !== t) return;
        f = !1;
      } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0);
    } catch (r) {
      o = true, n = r;
    } finally {
      try {
        if (!f && null != t.return && (u = t.return(), Object(u) !== u)) return;
      } finally {
        if (o) throw n;
      }
    }
    return a;
  }
}
function _nonIterableRest() {
  throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}
function ownKeys(e, r) {
  var t = Object.keys(e);
  if (Object.getOwnPropertySymbols) {
    var o = Object.getOwnPropertySymbols(e);
    r && (o = o.filter(function (r) {
      return Object.getOwnPropertyDescriptor(e, r).enumerable;
    })), t.push.apply(t, o);
  }
  return t;
}
function _objectSpread2(e) {
  for (var r = 1; r < arguments.length; r++) {
    var t = null != arguments[r] ? arguments[r] : {};
    r % 2 ? ownKeys(Object(t), true).forEach(function (r) {
      _defineProperty(e, r, t[r]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) {
      Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r));
    });
  }
  return e;
}
function _regenerator() {
  /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/babel/babel/blob/main/packages/babel-helpers/LICENSE */
  var e,
    t,
    r = "function" == typeof Symbol ? Symbol : {},
    n = r.iterator || "@@iterator",
    o = r.toStringTag || "@@toStringTag";
  function i(r, n, o, i) {
    var c = n && n.prototype instanceof Generator ? n : Generator,
      u = Object.create(c.prototype);
    return _regeneratorDefine(u, "_invoke", function (r, n, o) {
      var i,
        c,
        u,
        f = 0,
        p = o || [],
        y = false,
        G = {
          p: 0,
          n: 0,
          v: e,
          a: d,
          f: d.bind(e, 4),
          d: function (t, r) {
            return i = t, c = 0, u = e, G.n = r, a;
          }
        };
      function d(r, n) {
        for (c = r, u = n, t = 0; !y && f && !o && t < p.length; t++) {
          var o,
            i = p[t],
            d = G.p,
            l = i[2];
          r > 3 ? (o = l === n) && (u = i[(c = i[4]) ? 5 : (c = 3, 3)], i[4] = i[5] = e) : i[0] <= d && ((o = r < 2 && d < i[1]) ? (c = 0, G.v = n, G.n = i[1]) : d < l && (o = r < 3 || i[0] > n || n > l) && (i[4] = r, i[5] = n, G.n = l, c = 0));
        }
        if (o || r > 1) return a;
        throw y = true, n;
      }
      return function (o, p, l) {
        if (f > 1) throw TypeError("Generator is already running");
        for (y && 1 === p && d(p, l), c = p, u = l; (t = c < 2 ? e : u) || !y;) {
          i || (c ? c < 3 ? (c > 1 && (G.n = -1), d(c, u)) : G.n = u : G.v = u);
          try {
            if (f = 2, i) {
              if (c || (o = "next"), t = i[o]) {
                if (!(t = t.call(i, u))) throw TypeError("iterator result is not an object");
                if (!t.done) return t;
                u = t.value, c < 2 && (c = 0);
              } else 1 === c && (t = i.return) && t.call(i), c < 2 && (u = TypeError("The iterator does not provide a '" + o + "' method"), c = 1);
              i = e;
            } else if ((t = (y = G.n < 0) ? u : r.call(n, G)) !== a) break;
          } catch (t) {
            i = e, c = 1, u = t;
          } finally {
            f = 1;
          }
        }
        return {
          value: t,
          done: y
        };
      };
    }(r, o, i), true), u;
  }
  var a = {};
  function Generator() {}
  function GeneratorFunction() {}
  function GeneratorFunctionPrototype() {}
  t = Object.getPrototypeOf;
  var c = [][n] ? t(t([][n]())) : (_regeneratorDefine(t = {}, n, function () {
      return this;
    }), t),
    u = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(c);
  function f(e) {
    return Object.setPrototypeOf ? Object.setPrototypeOf(e, GeneratorFunctionPrototype) : (e.__proto__ = GeneratorFunctionPrototype, _regeneratorDefine(e, o, "GeneratorFunction")), e.prototype = Object.create(u), e;
  }
  return GeneratorFunction.prototype = GeneratorFunctionPrototype, _regeneratorDefine(u, "constructor", GeneratorFunctionPrototype), _regeneratorDefine(GeneratorFunctionPrototype, "constructor", GeneratorFunction), GeneratorFunction.displayName = "GeneratorFunction", _regeneratorDefine(GeneratorFunctionPrototype, o, "GeneratorFunction"), _regeneratorDefine(u), _regeneratorDefine(u, o, "Generator"), _regeneratorDefine(u, n, function () {
    return this;
  }), _regeneratorDefine(u, "toString", function () {
    return "[object Generator]";
  }), (_regenerator = function () {
    return {
      w: i,
      m: f
    };
  })();
}
function _regeneratorDefine(e, r, n, t) {
  var i = Object.defineProperty;
  try {
    i({}, "", {});
  } catch (e) {
    i = 0;
  }
  _regeneratorDefine = function (e, r, n, t) {
    function o(r, n) {
      _regeneratorDefine(e, r, function (e) {
        return this._invoke(r, n, e);
      });
    }
    r ? i ? i(e, r, {
      value: n,
      enumerable: !t,
      configurable: !t,
      writable: !t
    }) : e[r] = n : (o("next", 0), o("throw", 1), o("return", 2));
  }, _regeneratorDefine(e, r, n, t);
}
function _slicedToArray(r, e) {
  return _arrayWithHoles(r) || _iterableToArrayLimit(r, e) || _unsupportedIterableToArray(r, e) || _nonIterableRest();
}
function _toArray(r) {
  return _arrayWithHoles(r) || _iterableToArray(r) || _unsupportedIterableToArray(r) || _nonIterableRest();
}
function _toPrimitive(t, r) {
  if ("object" != typeof t || !t) return t;
  var e = t[Symbol.toPrimitive];
  if (void 0 !== e) {
    var i = e.call(t, r);
    if ("object" != typeof i) return i;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return ("string" === r ? String : Number)(t);
}
function _toPropertyKey(t) {
  var i = _toPrimitive(t, "string");
  return "symbol" == typeof i ? i : i + "";
}
function _typeof(o) {
  "@babel/helpers - typeof";

  return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) {
    return typeof o;
  } : function (o) {
    return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o;
  }, _typeof(o);
}
function _unsupportedIterableToArray(r, a) {
  if (r) {
    if ("string" == typeof r) return _arrayLikeToArray(r, a);
    var t = {}.toString.call(r).slice(8, -1);
    return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0;
  }
}

var __defProp$1 = Object.defineProperty;
var __defNormalProp$1 = function __defNormalProp(obj, key, value) {
  return key in obj ? __defProp$1(obj, key, {
    enumerable: true,
    configurable: true,
    writable: true,
    value
  }) : obj[key] = value;
};
var __publicField$1 = function __publicField(obj, key, value) {
  return __defNormalProp$1(obj, _typeof(key) !== "symbol" ? key + "" : key, value);
};
class Cache {
  constructor() {
    var size = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 100;
    this.size = size;
    __publicField$1(this, "items", []);
  }
  find(key) {
    var index = this.items.findIndex(function (x) {
      return x.key === key;
    });
    return index < 0 ? null : {
      index,
      item: this.items[index]
    };
  }
  get(key) {
    var reset = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;
    var entry = this.find(key);
    if (entry == null) {
      return null;
    }
    var result = entry.item.value;
    if (reset) {
      this.items.splice(entry.index, 1);
      this.items.push(entry.item);
    }
    return result;
  }
  set(key, value) {
    this.remove(key);
    this.items.push({
      key,
      value
    });
    if (this.items.length > this.size) {
      this.items.shift();
    }
  }
  remove(key) {
    var entry = this.find(key);
    if (entry != null) {
      this.items.splice(entry.index, 1);
      return entry.item.value;
    }
    return null;
  }
}

function loadHTML(html) {
  return cheerio.load(html);
}

function shallowMerge(obj) {
  var result = _objectSpread2({}, obj);
  for (var _len = arguments.length, data = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
    data[_key - 1] = arguments[_key];
  }
  data.forEach(function (x) {
    if (x != null) {
      Object.entries(x).forEach(function (_ref) {
        var _ref2 = _slicedToArray(_ref, 2),
          k = _ref2[0],
          v = _ref2[1];
        if (v != null && v !== "") {
          result[k] = v;
        }
      });
    }
  });
  return result;
}

var __defProp = Object.defineProperty;
var __defNormalProp = function __defNormalProp(obj, key, value) {
  return key in obj ? __defProp(obj, key, {
    enumerable: true,
    configurable: true,
    writable: true,
    value
  }) : obj[key] = value;
};
var __publicField = function __publicField(obj, key, value) {
  return __defNormalProp(obj, _typeof(key) !== "symbol" ? key + "" : key, value);
};
var USER_AGENT = "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/142.0.0.0 Safari/537.36 Edg/142.0.0.0";
function createHttp(baseURL, config) {
  var options = _objectSpread2(_objectSpread2({}, config), {}, {
    headers: _objectSpread2({
      "User-Agent": USER_AGENT
    }, void 0 ),
    baseURL
  });
  var http = axios.create(options);
  var cookieJar = new CookeJar();
  http.interceptors.request.use(function (config2) {
    var _config2$headers;
    if (((_config2$headers = config2.headers) === null || _config2$headers === void 0 ? void 0 : _config2$headers.Cookie) === void 0) {
      var cookie = cookieJar.get();
      if (cookie != null) {
        config2.headers = _objectSpread2(_objectSpread2({}, config2.headers), {}, {
          "Cookie": cookie
        });
      }
    }
    return config2;
  });
  http.interceptors.response.use(function (res) {
    cookieJar.set(res.headers["set-cookie"]);
    return res;
  }, function (err) {
    var _err$response;
    cookieJar.set(err === null || err === void 0 || (_err$response = err.response) === null || _err$response === void 0 || (_err$response = _err$response.headers) === null || _err$response === void 0 ? void 0 : _err$response["set-cookie"]);
    throw err;
  });
  var referer;
  function request(_x, _x2, _x3) {
    return _request.apply(this, arguments);
  }
  function _request() {
    _request = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee2(url, data, config2) {
      var _res$headers$content;
      var options2, _options2$method, method, payloadMethods, key, res;
      return _regenerator().w(function (_context2) {
        while (1) switch (_context2.n) {
          case 0:
            options2 = typeof config2 === "string" ? {
              method: config2
            } : _objectSpread2({}, config2);
            if (data != null) {
              _options2$method = options2.method, method = _options2$method === void 0 ? "GET" : _options2$method;
              payloadMethods = ["PUT", "POST", "PATCH"];
              key = payloadMethods.includes(method.toUpperCase()) ? "data" : "params";
              options2[key] = _typeof(data) === "object" ? shallowMerge(options2[key], data) : data;
            }
            if (referer != null) {
              options2.headers = _objectSpread2(_objectSpread2({}, options2.headers), {}, {
                "Referer": referer
              });
            }
            options2.url = url;
            _context2.n = 1;
            return http.request(options2);
          case 1:
            res = _context2.v;
            if ((_res$headers$content = res.headers["content-type"]) !== null && _res$headers$content !== void 0 && _res$headers$content.startsWith("text/html")) {
              referer = options2.url;
            }
            return _context2.a(2, res);
        }
      }, _callee2);
    }));
    return _request.apply(this, arguments);
  }
  var result = request;
  result.baseURL = baseURL;
  result.raw = /*#__PURE__*/_asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee() {
    var res,
      _args = arguments;
    return _regenerator().w(function (_context) {
      while (1) switch (_context.n) {
        case 0:
          _context.n = 1;
          return request(..._args);
        case 1:
          res = _context.v;
          return _context.a(2, res.data);
      }
    }, _callee);
  }));
  return result;
}
class CookeJar {
  constructor() {
    __publicField(this, "dict", {});
  }
  set(cookies) {
    var _this = this;
    (cookies !== null && cookies !== void 0 ? cookies : []).forEach(function (x) {
      var _x$split = x.split(";", 2),
        _x$split2 = _slicedToArray(_x$split, 1),
        kv = _x$split2[0];
      var _kv$split = kv.split("=", 2),
        _kv$split2 = _slicedToArray(_kv$split, 2),
        k = _kv$split2[0],
        v = _kv$split2[1];
      if (v != null) {
        _this.dict[k] = v;
      }
    });
  }
  get() {
    var items = Object.entries(this.dict);
    if (items.length > 0) {
      return items.map(function (_ref2) {
        var _ref3 = _slicedToArray(_ref2, 2),
          k = _ref3[0],
          v = _ref3[1];
        return `${k}=${v}`;
      }).join("; ");
    }
    return null;
  }
  clear() {
    this.dict = {};
  }
}

function isMusicSheet(val) {
  var _ref = val !== null && val !== void 0 ? val : {},
    musicList = _ref.musicList;
  return Array.isArray(musicList);
}

var http = createHttp("https://www.2t58.com");
var requestHttp = /*#__PURE__*/function () {
  var _ref = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee(url, data, config) {
    var response, cookies, _t;
    return _regenerator().w(function (_context) {
      while (1) switch (_context.p = _context.n) {
        case 0:
          _context.p = 0;
          _context.n = 1;
          return http.raw(url, data, config);
        case 1:
          return _context.a(2, _context.v);
        case 2:
          _context.p = 2;
          _t = _context.v;
          response = _t.response;
          if (!(response != null)) {
            _context.n = 3;
            break;
          }
          if (!(response.status === 403)) {
            _context.n = 3;
            break;
          }
          cookies = response.headers["set-cookie"];
          if (!(cookies != null && cookies.length > 0)) {
            _context.n = 3;
            break;
          }
          return _context.a(2, http.raw(url, data, config));
        case 3:
          throw _t;
        case 4:
          return _context.a(2);
      }
    }, _callee, null, [[0, 2]]);
  }));
  return function requestHttp(_x, _x2, _x3) {
    return _ref.apply(this, arguments);
  };
}();
var platform = "爱听音乐";
var plugin = {
  platform,
  author: "Billy Poon",
  version: "0.0.1",
  srcUrl: "https://billy-poon.github.io/musicfree/packages/plugins/dist/2t58.js",
  getTopLists() {
    return _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee2() {
      var url, html, $, items;
      return _regenerator().w(function (_context2) {
        while (1) switch (_context2.n) {
          case 0:
            url = "/list/top.html";
            _context2.n = 1;
            return requestHttp(url);
          case 1:
            html = _context2.v;
            $ = loadHTML(html);
            items = $(".ilingku_fl > li > a[href]").toArray().map(function (x) {
              var $x = $(x);
              return {
                id: $x.attr("href"),
                title: $x.text().trim()
              };
            });
            return _context2.a(2, [{
              title: "TOP榜单",
              data: [{
                id: url,
                title: "飙升榜"
              }, ...items]
            }]);
        }
      }, _callee2);
    }))();
  },
  getTopListDetail(topListItem, page) {
    return _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee3() {
      var url, sheet, _ref2, isEnd, title, _ref2$data, data;
      return _regenerator().w(function (_context3) {
        while (1) switch (_context3.n) {
          case 0:
            url = topListItem.id;
            _context3.n = 1;
            return requestSheet(url, page);
          case 1:
            sheet = _context3.v;
            _ref2 = sheet !== null && sheet !== void 0 ? sheet : {}, isEnd = _ref2.isEnd, title = _ref2.title, _ref2$data = _ref2.data, data = _ref2$data === void 0 ? [] : _ref2$data;
            return _context3.a(2, _objectSpread2(_objectSpread2({}, topListItem), {}, {
              isEnd,
              title: title || topListItem.title,
              musicList: data
            }));
        }
      }, _callee3);
    }))();
  },
  getMusicInfo(musicBase) {
    return _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee4() {
      var result;
      return _regenerator().w(function (_context4) {
        while (1) switch (_context4.n) {
          case 0:
            _context4.n = 1;
            return requestMusic(musicBase.id);
          case 1:
            result = _context4.v;
            return _context4.a(2, result);
        }
      }, _callee4);
    }))();
  },
  getMediaSource(mediaItem) {
    return _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee5() {
      var url, media;
      return _regenerator().w(function (_context5) {
        while (1) switch (_context5.n) {
          case 0:
            url = mediaItem.url;
            if (!(url == null)) {
              _context5.n = 2;
              break;
            }
            _context5.n = 1;
            return requestMediaInfo(mediaItem.id);
          case 1:
            media = _context5.v;
            if (media != null) {
              url = media.url;
            }
          case 2:
            return _context5.a(2, url != null ? {
              url,
              userAgent: USER_AGENT
            } : null);
        }
      }, _callee5);
    }))();
  },
  getLyric(musicItem) {
    return _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee6() {
      var rawLrc, lyrics;
      return _regenerator().w(function (_context6) {
        while (1) switch (_context6.n) {
          case 0:
            rawLrc = musicItem.rawLrc;
            if (!(rawLrc == null)) {
              _context6.n = 2;
              break;
            }
            _context6.n = 1;
            return requestLyrics(musicItem.id);
          case 1:
            lyrics = _context6.v;
            if ((lyrics === null || lyrics === void 0 ? void 0 : lyrics.lrc) != null) {
              rawLrc = lyrics === null || lyrics === void 0 ? void 0 : lyrics.lrc;
            }
          case 2:
            return _context6.a(2, rawLrc != null ? {
              rawLrc
            } : null);
        }
      }, _callee6);
    }))();
  },
  search(query, page, type) {
    return _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee7() {
      var data, url, result;
      return _regenerator().w(function (_context7) {
        while (1) switch (_context7.n) {
          case 0:
            data = [];
            if (!(type === "music")) {
              _context7.n = 2;
              break;
            }
            url = "/so/" + encodeURIComponent(query) + ".html";
            _context7.n = 1;
            return requestSheet(url, page);
          case 1:
            result = _context7.v;
            if (!(result != null)) {
              _context7.n = 2;
              break;
            }
            return _context7.a(2, result);
          case 2:
            return _context7.a(2, {
              isEnd: true,
              data
            });
        }
      }, _callee7);
    }))();
  },
  getRecommendSheetTags() {
    return _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee8() {
      var html, $, items, _items, first, rest;
      return _regenerator().w(function (_context8) {
        while (1) switch (_context8.n) {
          case 0:
            _context8.n = 1;
            return requestHttp("/playtype/index.html");
          case 1:
            html = _context8.v;
            $ = loadHTML(html);
            items = $(".ilingku_fl").toArray().map(function (x) {
              var _$$find$toArray = $(x).find("li").toArray(),
                _$$find$toArray2 = _toArray(_$$find$toArray),
                title = _$$find$toArray2[0],
                list = _arrayLikeToArray(_$$find$toArray2).slice(1);
              var data = list.map(function (y) {
                var $link = $(y).find("a[href]");
                return {
                  id: $link.attr("href"),
                  title: $link.text().trim()
                };
              });
              return {
                title: $(title).text().trim().replace(/[:：]+/, ""),
                data
              };
            });
            _items = _toArray(items), first = _items[0], rest = _arrayLikeToArray(_items).slice(1);
            return _context8.a(2, {
              pinned: first.data,
              data: rest
            });
        }
      }, _callee8);
    }))();
  },
  getRecommendSheetsByTag(tag, page) {
    return _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee9() {
      var pageURL, html, $, data, isEnd;
      return _regenerator().w(function (_context9) {
        while (1) switch (_context9.n) {
          case 0:
            pageURL = page != null ? getPageURL(tag.id, page) : tag.id;
            if (!(pageURL != null)) {
              _context9.n = 2;
              break;
            }
            _context9.n = 1;
            return requestHttp(pageURL);
          case 1:
            html = _context9.v;
            $ = loadHTML(html);
            data = $("ul.play > li .name a[href]").toArray().map(function (x) {
              var _exec;
              var $x = $(x);
              var href = $x.attr("href");
              var _ref3 = (_exec = /\/(\w+).html/.exec(href)) !== null && _exec !== void 0 ? _exec : [],
                _ref4 = _slicedToArray(_ref3, 2),
                preferId = _ref4[1];
              return {
                id: preferId !== null && preferId !== void 0 ? preferId : href,
                title: $x.text().trim()
              };
            });
            isEnd = $(".page a").last().text().trim() !== "尾页";
            return _context9.a(2, {
              isEnd,
              data
            });
          case 2:
            return _context9.a(2, {
              isEnd: true,
              data: []
            });
        }
      }, _callee9);
    }))();
  },
  getMusicSheetInfo(sheetItem, page) {
    return _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee0() {
      var result, isEnd, data;
      return _regenerator().w(function (_context0) {
        while (1) switch (_context0.n) {
          case 0:
            _context0.n = 1;
            return requestSheet(sheetItem.id, page);
          case 1:
            result = _context0.v;
            if (!(result != null)) {
              _context0.n = 2;
              break;
            }
            isEnd = result.isEnd, data = result.data;
            return _context0.a(2, {
              isEnd,
              musicList: data
            });
          case 2:
            return _context0.a(2, {
              isEnd: true,
              musicList: []
            });
        }
      }, _callee0);
    }))();
  },
  importMusicSheet(urlLike) {
    return _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee1() {
      var data, _data$musicList, sheet, url, page, pageURL, pageSheet;
      return _regenerator().w(function (_context1) {
        while (1) switch (_context1.n) {
          case 0:
            _context1.n = 1;
            return requestHttp(urlLike);
          case 1:
            data = _context1.v;
            if (!isMusicSheet(data)) {
              _context1.n = 2;
              break;
            }
            return _context1.a(2, ((_data$musicList = data.musicList) !== null && _data$musicList !== void 0 ? _data$musicList : []).filter(function (x) {
              return x.platform == null || x.platform === platform;
            }));
          case 2:
            if (!(typeof data === "string")) {
              _context1.n = 8;
              break;
            }
            sheet = parseMusicSheet(data);
            if (!(!sheet.isEnd && urlLike.startsWith(http.baseURL))) {
              _context1.n = 7;
              break;
            }
            url = urlLike.slice(http.baseURL.length);
            page = 2;
          case 3:
            pageURL = getPageURL(url, page++);
            if (!(pageURL == null)) {
              _context1.n = 4;
              break;
            }
            return _context1.a(3, 7);
          case 4:
            _context1.n = 5;
            return requestSheet(pageURL);
          case 5:
            pageSheet = _context1.v;
            if (pageSheet !== null && pageSheet !== void 0 && pageSheet.data) {
              sheet.data.push(...pageSheet.data);
            }
            if (!(pageSheet == null || pageSheet.isEnd)) {
              _context1.n = 6;
              break;
            }
            return _context1.a(3, 7);
          case 6:
            _context1.n = 3;
            break;
          case 7:
            return _context1.a(2, sheet.data);
          case 8:
            return _context1.a(2, []);
        }
      }, _callee1);
    }))();
  }
};
function requestSheet(_x4, _x5) {
  return _requestSheet.apply(this, arguments);
}
function _requestSheet() {
  _requestSheet = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee10(url, page) {
    var pageURL, html;
    return _regenerator().w(function (_context10) {
      while (1) switch (_context10.n) {
        case 0:
          if (!url.endsWith(".html")) {
            url = `/playlist/${url}.html`;
          }
          pageURL = page != null && page > 1 ? getPageURL(url, page) : url;
          if (!(pageURL != null)) {
            _context10.n = 2;
            break;
          }
          _context10.n = 1;
          return requestHttp(pageURL);
        case 1:
          html = _context10.v;
          if (!(typeof html === "string")) {
            _context10.n = 2;
            break;
          }
          return _context10.a(2, parseMusicSheet(html));
        case 2:
          return _context10.a(2, null);
      }
    }, _callee10);
  }));
  return _requestSheet.apply(this, arguments);
}
function parseMusicSheet(html) {
  var $ = loadHTML(html);
  var $playList = $(".play_list");
  var data = $playList.find("a[href][target=_mp3]").toArray().map(function (x) {
    var $x = $(x);
    var id = $x.attr("href");
    var text = $x.text().trim();
    return _objectSpread2({
      id
    }, parseMusicTitle(text));
  });
  var title = null;
  var $title = $playList.find(".title > h1").first();
  if ($title != null) {
    title = $title.text().trim();
  }
  var isEnd = $playList.find(".page a").last().text().trim() !== "尾页";
  if (title === "歌单歌曲列表") {
    data.forEach(function (x) {
      var artist = x.artist,
        title2 = x.title;
      x.title = artist !== null && artist !== void 0 ? artist : "";
      x.artist = title2;
    });
  }
  return {
    title,
    data,
    isEnd
  };
}
function getPageURL(url, page) {
  var _exec2;
  var _ref5 = (_exec2 = /(.+)\.html([?#].*)?/.exec(url)) !== null && _exec2 !== void 0 ? _exec2 : [],
    _ref6 = _slicedToArray(_ref5, 3),
    prefix = _ref6[1],
    _ref6$ = _ref6[2],
    suffix = _ref6$ === void 0 ? "" : _ref6$;
  if (prefix != null) {
    return `${prefix}/${page}.html${suffix}`;
  }
  return null;
}
var cache = new Cache(100);
function requestMusic(_x6) {
  return _requestMusic.apply(this, arguments);
}
function _requestMusic() {
  _requestMusic = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee11(musicId) {
    var _$$html, _exec5;
    var cached, html, $, script, _ref1, _ref10, type, id, _$$attr, title, result, artwork;
    return _regenerator().w(function (_context11) {
      while (1) switch (_context11.n) {
        case 0:
          cached = cache.get(musicId);
          if (!(cached != null)) {
            _context11.n = 1;
            break;
          }
          return _context11.a(2, cached);
        case 1:
          _context11.n = 2;
          return requestHttp(musicId);
        case 2:
          html = _context11.v;
          $ = loadHTML(html);
          script = ((_$$html = $(".main + script").html()) !== null && _$$html !== void 0 ? _$$html : "").slice(0, 100);
          _ref1 = (_exec5 = /player\("(.+)",\s*"(.+)"\)/.exec(script)) !== null && _exec5 !== void 0 ? _exec5 : [], _ref10 = _slicedToArray(_ref1, 3), type = _ref10[1], id = _ref10[2];
          if (!(type != null && id != null)) {
            _context11.n = 3;
            break;
          }
          title = $(".djname").remove("a").text().trim();
          result = _objectSpread2(_objectSpread2({}, title !== "" ? parseMusicTitle(title) : {}), {}, {
            id: musicId,
            playInfo: {
              id,
              type
            }
          });
          artwork = (_$$attr = $("#mcover").attr("src")) !== null && _$$attr !== void 0 ? _$$attr : "";
          if (artwork !== "") {
            result.artwork = artwork;
          }
          cache.set(musicId, result);
          return _context11.a(2, result);
        case 3:
          return _context11.a(2, null);
      }
    }, _callee11);
  }));
  return _requestMusic.apply(this, arguments);
}
function parseMusicTitle(val) {
  var _exec3, _exec4;
  var _ref7 = (_exec3 = /^(.+)-(.+)$/.exec(val)) !== null && _exec3 !== void 0 ? _exec3 : [],
    _ref8 = _slicedToArray(_ref7, 3),
    x1 = _ref8[1],
    y1 = _ref8[2];
  if (x1 != null && y1 != null) {
    return {
      artist: x1.trim(),
      title: y1.trim()
    };
  }
  var _ref9 = (_exec4 = /^(.+)《(.+)》/.exec(val)) !== null && _exec4 !== void 0 ? _exec4 : [],
    _ref0 = _slicedToArray(_ref9, 3),
    x2 = _ref0[1],
    y2 = _ref0[2];
  if (x2 != null && y2 != null) {
    return {
      artist: x2.trim(),
      title: y2.trim()
    };
  }
  return {
    title: val
  };
}
function requestMediaInfo(_x7) {
  return _requestMediaInfo.apply(this, arguments);
}
function _requestMediaInfo() {
  _requestMediaInfo = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee12(musicId) {
    var music, mediaInfo, _music$playInfo, id, type, res;
    return _regenerator().w(function (_context12) {
      while (1) switch (_context12.n) {
        case 0:
          _context12.n = 1;
          return requestMusic(musicId);
        case 1:
          music = _context12.v;
          if (!(music != null)) {
            _context12.n = 4;
            break;
          }
          mediaInfo = music.playInfo.mediaInfo;
          if (!(mediaInfo != null)) {
            _context12.n = 2;
            break;
          }
          return _context12.a(2, mediaInfo);
        case 2:
          _music$playInfo = music.playInfo, id = _music$playInfo.id, type = _music$playInfo.type;
          _context12.n = 3;
          return requestHttp("/js/play.php", null, {
            method: "POST",
            headers: {
              "content-type": "application/x-www-form-urlencoded"
            },
            data: qs.stringify({
              id,
              type
            }),
            responseType: "json"
          });
        case 3:
          res = _context12.v;
          if (!((res === null || res === void 0 ? void 0 : res.url) != null)) {
            _context12.n = 4;
            break;
          }
          music.playInfo.mediaInfo = res;
          cache.set(musicId, music);
          return _context12.a(2, res);
        case 4:
          return _context12.a(2, null);
      }
    }, _callee12);
  }));
  return _requestMediaInfo.apply(this, arguments);
}
function requestLyrics(_x8) {
  return _requestLyrics.apply(this, arguments);
}
function _requestLyrics() {
  _requestLyrics = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee13(musicId) {
    var music, _music$playInfo$media, lyricsInfo, mediaInfo, res, _t2;
    return _regenerator().w(function (_context13) {
      while (1) switch (_context13.n) {
        case 0:
          _context13.n = 1;
          return requestMusic(musicId);
        case 1:
          music = _context13.v;
          if (!(music != null)) {
            _context13.n = 7;
            break;
          }
          lyricsInfo = music.playInfo.lyricsInfo;
          if (!(lyricsInfo != null)) {
            _context13.n = 2;
            break;
          }
          return _context13.a(2, lyricsInfo);
        case 2:
          if (!((_music$playInfo$media = music.playInfo.mediaInfo) !== null && _music$playInfo$media !== void 0)) {
            _context13.n = 3;
            break;
          }
          _t2 = _music$playInfo$media;
          _context13.n = 5;
          break;
        case 3:
          _context13.n = 4;
          return requestMediaInfo(musicId);
        case 4:
          _t2 = _context13.v;
        case 5:
          mediaInfo = _t2;
          if (!((mediaInfo === null || mediaInfo === void 0 ? void 0 : mediaInfo.lkid) != null)) {
            _context13.n = 7;
            break;
          }
          _context13.n = 6;
          return requestHttp("https://js.eev3.com/lrc.php", {
            cid: mediaInfo.lkid
          }, {
            responseType: "json"
          });
        case 6:
          res = _context13.v;
          if (!((res === null || res === void 0 ? void 0 : res.lrc) != null)) {
            _context13.n = 7;
            break;
          }
          music.playInfo.lyricsInfo = res;
          cache.set(musicId, music);
          return _context13.a(2, res);
        case 7:
          return _context13.a(2, null);
      }
    }, _callee13);
  }));
  return _requestLyrics.apply(this, arguments);
}

module.exports = plugin;
