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
function _arrayWithoutHoles(r) {
  if (Array.isArray(r)) return _arrayLikeToArray(r);
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
function _classCallCheck(a, n) {
  if (!(a instanceof n)) throw new TypeError("Cannot call a class as a function");
}
function _defineProperties(e, r) {
  for (var t = 0; t < r.length; t++) {
    var o = r[t];
    o.enumerable = o.enumerable || false, o.configurable = true, "value" in o && (o.writable = true), Object.defineProperty(e, _toPropertyKey(o.key), o);
  }
}
function _createClass(e, r, t) {
  return r && _defineProperties(e.prototype, r), Object.defineProperty(e, "prototype", {
    writable: false
  }), e;
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
function _nonIterableSpread() {
  throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
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
function _toConsumableArray(r) {
  return _arrayWithoutHoles(r) || _iterableToArray(r) || _unsupportedIterableToArray(r) || _nonIterableSpread();
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

function loadHTML(html) {
  return cheerio.load(html);
}
function parseTable($el) {
  function parseCell($cell) {
    var $anchor = $cell.find("a[href]").first();
    if ($anchor.length > 0) {
      return {
        type: "link",
        text: $anchor.text().trim(),
        url: $anchor.attr("href")
      };
    }
    var text = $cell.text().trim();
    if (text === "") {
      var $image = $cell.find("img[src]").first();
      if ($image.length > 0) {
        var _$image$attr;
        return {
          type: "image",
          text: (_$image$attr = $image.attr("alt")) !== null && _$image$attr !== void 0 ? _$image$attr : "",
          url: $image.attr("src")
        };
      }
    }
    return {
      type: "text",
      text
    };
  }
  var $ = function $(el) {
    return $el._make(el);
  };
  var result = $el.find("tr").toArray().map(function (x) {
    return $(x).children().toArray().map(function (y) {
      return parseCell($(y));
    });
  });
  return result;
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
  var cookieJar = new CookieJar();
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
          return request.apply(void 0, _args);
        case 1:
          res = _context.v;
          return _context.a(2, res.data);
      }
    }, _callee);
  }));
  return result;
}
var CookieJar = /*#__PURE__*/function () {
  function CookieJar() {
    _classCallCheck(this, CookieJar);
    __publicField(this, "dict", {});
  }
  return _createClass(CookieJar, [{
    key: "set",
    value: function set(cookies) {
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
  }, {
    key: "get",
    value: function get() {
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
  }, {
    key: "clear",
    value: function clear() {
      this.dict = {};
    }
  }]);
}();

function isMusicSheet(val) {
  var _ref = val !== null && val !== void 0 ? val : {},
    musicList = _ref.musicList;
  return Array.isArray(musicList);
}

var http = createHttp("https://www.gequbao.com").raw;
var platform = "歌曲宝";
var plugin = {
  platform,
  author: "Billy Poon",
  version: "0.0.3",
  srcUrl: "https://billy-poon.github.io/musicfree/packages/plugins/dist/gequbao.js",
  getTopLists() {
    return _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee() {
      return _regenerator().w(function (_context) {
        while (1) switch (_context.n) {
          case 0:
            return _context.a(2, [{
              title: "排行",
              data: [{
                id: "/hot-music",
                title: "热门推荐"
              }
              // {
              //     id: '/top/week-download',
              //     title: '周下载榜'
              // },
              ]
            }]);
        }
      }, _callee);
    }))();
  },
  getTopListDetail(topListItem, page) {
    return _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee2() {
      var sheet, _ref, isEnd, title, _ref$data, data;
      return _regenerator().w(function (_context2) {
        while (1) switch (_context2.n) {
          case 0:
            _context2.n = 1;
            return requestSheet(topListItem.id, page);
          case 1:
            sheet = _context2.v;
            _ref = sheet !== null && sheet !== void 0 ? sheet : {}, isEnd = _ref.isEnd, title = _ref.title, _ref$data = _ref.data, data = _ref$data === void 0 ? [] : _ref$data;
            return _context2.a(2, _objectSpread2(_objectSpread2({}, topListItem), {}, {
              isEnd,
              title: title || topListItem.title,
              musicList: data
            }));
        }
      }, _callee2);
    }))();
  },
  getMusicInfo(musicBase) {
    return _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee3() {
      var result;
      return _regenerator().w(function (_context3) {
        while (1) switch (_context3.n) {
          case 0:
            _context3.n = 1;
            return requestMusic(musicBase.id);
          case 1:
            result = _context3.v;
            if (!(result != null)) {
              _context3.n = 2;
              break;
            }
            return _context3.a(2, _objectSpread2(_objectSpread2({}, musicBase), result));
          case 2:
            return _context3.a(2, null);
        }
      }, _callee3);
    }))();
  },
  getMediaSource(mediaItem) {
    return _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee4() {
      var url, music;
      return _regenerator().w(function (_context4) {
        while (1) switch (_context4.n) {
          case 0:
            url = mediaItem.url;
            if (!(url == null)) {
              _context4.n = 2;
              break;
            }
            _context4.n = 1;
            return requestMusic(mediaItem.id);
          case 1:
            music = _context4.v;
            if ((music === null || music === void 0 ? void 0 : music.url) != null) {
              url = music.url;
            }
          case 2:
            return _context4.a(2, url != null ? {
              url,
              userAgent: USER_AGENT
            } : null);
        }
      }, _callee4);
    }))();
  },
  getLyric(musicItem) {
    return _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee5() {
      var rawLrc, music;
      return _regenerator().w(function (_context5) {
        while (1) switch (_context5.n) {
          case 0:
            rawLrc = musicItem.rawLrc;
            if (!(rawLrc == null)) {
              _context5.n = 2;
              break;
            }
            _context5.n = 1;
            return requestMusic(musicItem.id);
          case 1:
            music = _context5.v;
            if ((music === null || music === void 0 ? void 0 : music.rawLrc) != null) {
              rawLrc = music.rawLrc;
            }
          case 2:
            return _context5.a(2, rawLrc != null ? {
              rawLrc
            } : null);
        }
      }, _callee5);
    }))();
  },
  search(query, page, type) {
    return _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee6() {
      var data, url, html, $, notfound;
      return _regenerator().w(function (_context6) {
        while (1) switch (_context6.n) {
          case 0:
            data = [];
            if (!(type === "music")) {
              _context6.n = 2;
              break;
            }
            url = "/s/" + encodeURIComponent(query);
            _context6.n = 1;
            return http(url);
          case 1:
            html = _context6.v;
            $ = loadHTML(html);
            notfound = $("#search-notfound-btn")[0];
            if ((notfound === null || notfound === void 0 ? void 0 : notfound.parent) != null) {
              $(notfound.parent).find(".row").toArray().forEach(function (x) {
                var $anchor = $(x).find(".col-content > a[href]").first();
                if ($anchor.length > 0) {
                  data.push({
                    id: $anchor.attr("href"),
                    title: $anchor.find(".music-title").text().trim(),
                    artist: $anchor.find(".text-jade").text().trim()
                  });
                }
              });
            }
          case 2:
            return _context6.a(2, {
              isEnd: true,
              data
            });
        }
      }, _callee6);
    }))();
  },
  importMusicSheet(urlLike) {
    return _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee7() {
      var data, _data$musicList;
      return _regenerator().w(function (_context7) {
        while (1) switch (_context7.n) {
          case 0:
            _context7.n = 1;
            return http(urlLike, null, {
              responseType: "json"
            });
          case 1:
            data = _context7.v;
            if (!isMusicSheet(data)) {
              _context7.n = 2;
              break;
            }
            return _context7.a(2, ((_data$musicList = data.musicList) !== null && _data$musicList !== void 0 ? _data$musicList : []).filter(function (x) {
              return x.platform == null || x.platform === platform;
            }));
          case 2:
            return _context7.a(2, []);
        }
      }, _callee7);
    }))();
  }
};
function requestSheet(_x, _x2) {
  return _requestSheet.apply(this, arguments);
}
function _requestSheet() {
  _requestSheet = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee8(url, page) {
    var pagedURL, html, $, thead, table, _parseTable, _parseTable2, head, first, rest, indexMap, data, title, $title, $lastPage, isEnd;
    return _regenerator().w(function (_context8) {
      while (1) switch (_context8.n) {
        case 0:
          pagedURL = page != null && page > 1 ? `${url}/${page}` : url;
          _context8.n = 1;
          return http(pagedURL, {
            page
          });
        case 1:
          html = _context8.v;
          $ = loadHTML(html);
          thead = $("table > thead.thead-light")[0];
          table = thead.parent;
          if (!(table == null)) {
            _context8.n = 2;
            break;
          }
          return _context8.a(2, null);
        case 2:
          _parseTable = parseTable($(table)), _parseTable2 = _toArray(_parseTable), head = _parseTable2[0], first = _parseTable2[1], rest = _arrayLikeToArray(_parseTable2).slice(2);
          if (!(head == null || first == null)) {
            _context8.n = 3;
            break;
          }
          return _context8.a(2, null);
        case 3:
          indexMap = {
            title: head.findIndex(function (x) {
              return x.text === "歌名";
            }),
            artist: head.findIndex(function (x) {
              return x.text === "歌手";
            })
          };
          data = [first].concat(_toConsumableArray(rest)).map(function (x) {
            var _x$indexMap$artist$te;
            var titleCell = x[indexMap.title];
            if ((titleCell === null || titleCell === void 0 ? void 0 : titleCell.type) !== "link") {
              return null;
            }
            var id = titleCell.url;
            var title2 = titleCell.text;
            var artist = (_x$indexMap$artist$te = x[indexMap.artist].text) !== null && _x$indexMap$artist$te !== void 0 ? _x$indexMap$artist$te : null;
            return {
              id,
              title: title2,
              artist
            };
          }).filter(Boolean);
          title = null;
          $title = $(".jumbotron").first();
          if ($title != null) {
            $title.find("small").remove();
            title = $title.text().trim();
          }
          $lastPage = $(".pagination .page-link").last();
          isEnd = $lastPage.length == 0 || $lastPage.hasClass("disabled");
          return _context8.a(2, {
            title,
            data,
            isEnd
          });
      }
    }, _callee8);
  }));
  return _requestSheet.apply(this, arguments);
}
var CACHE_SIZE = 100;
var cacheList = [];
function requestMusic(_x3) {
  return _requestMusic.apply(this, arguments);
}
function _requestMusic() {
  _requestMusic = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee9(url) {
    var _exec;
    var cache, html, _ref2, _ref3, app_json, app_data, _ref4, play_id, title, artist, artwork, _res$data$url, _res$data, res, mp3_url, result, $, rawLrc, _t;
    return _regenerator().w(function (_context9) {
      while (1) switch (_context9.p = _context9.n) {
        case 0:
          cache = cacheList.find(function (x) {
            return x.id === url;
          });
          if (!(cache != null)) {
            _context9.n = 1;
            break;
          }
          return _context9.a(2, cache);
        case 1:
          _context9.n = 2;
          return http(url);
        case 2:
          html = _context9.v;
          _ref2 = (_exec = /window\.appData\s*=\s*(\{.+\});/.exec(html)) !== null && _exec !== void 0 ? _exec : [], _ref3 = _slicedToArray(_ref2, 2), app_json = _ref3[1];
          _context9.p = 3;
          app_data = JSON.parse(app_json);
          _ref4 = app_data !== null && app_data !== void 0 ? app_data : {}, play_id = _ref4.play_id, title = _ref4.mp3_title, artist = _ref4.mp3_author, artwork = _ref4.mp3_cover;
          if (!(play_id != null)) {
            _context9.n = 5;
            break;
          }
          _context9.n = 4;
          return http("/api/play-url", null, {
            method: "POST",
            headers: {
              "x-requested-with": "XMLHttpRequest",
              "content-type": "application/x-www-form-urlencoded"
            },
            data: qs.stringify({
              id: play_id
            }),
            responseType: "json"
          });
        case 4:
          res = _context9.v;
          mp3_url = (_res$data$url = res === null || res === void 0 || (_res$data = res.data) === null || _res$data === void 0 ? void 0 : _res$data.url) !== null && _res$data$url !== void 0 ? _res$data$url : "";
          if (!(mp3_url !== "")) {
            _context9.n = 5;
            break;
          }
          result = {
            id: url,
            url: mp3_url
          };
          $ = loadHTML(html);
          rawLrc = $("#content-lrc").text().trim();
          result = shallowMerge(result, {
            title,
            artist,
            artwork,
            rawLrc
          });
          cacheList.push(result);
          if (cacheList.length > CACHE_SIZE) {
            cacheList.shift();
          }
          return _context9.a(2, result);
        case 5:
          _context9.n = 7;
          break;
        case 6:
          _context9.p = 6;
          _t = _context9.v;
          console.error(_t);
        case 7:
          return _context9.a(2, null);
      }
    }, _callee9, null, [[3, 6]]);
  }));
  return _requestMusic.apply(this, arguments);
}

module.exports = plugin;
