(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["BlockElement"] = factory();
	else
		root["BlockElement"] = factory();
})(window, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
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
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/BlockElement.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/BlockElement.js":
/*!*****************************!*\
  !*** ./src/BlockElement.js ***!
  \*****************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nvar _Blocker = __webpack_require__(/*! ./Blocker */ \"./src/Blocker.js\");\n\nvar _Blocker2 = _interopRequireDefault(_Blocker);\n\nfunction _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }\n\nvar BlockerDecorator = __webpack_require__(/*! ./BlockerDecorator */ \"./src/BlockerDecorator.js\");\n\nvar Message = __webpack_require__(/*! ./Message */ \"./src/Message.js\");\n\nmodule.exports = {\n  BlockerDecorator: BlockerDecorator,\n  decorators: {\n    Message: Message\n  },\n  Blocker: _Blocker2.default\n};\n\n//# sourceURL=webpack://BlockElement/./src/BlockElement.js?");

/***/ }),

/***/ "./src/Blocker.js":
/*!************************!*\
  !*** ./src/Blocker.js ***!
  \************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nfunction _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError(\"Cannot call a class as a function\"); } }\n\nfunction _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if (\"value\" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }\n\nfunction _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }\n\nmodule.exports =\n/*#__PURE__*/\nfunction () {\n  function Blocker() {\n    _classCallCheck(this, Blocker);\n  }\n\n  _createClass(Blocker, null, [{\n    key: \"block\",\n\n    /**\n     *\n     * @param elem {HTMLElement}\n     * @returns {Promise<any>}\n     */\n    value: function block(elem) {\n      return new Promise(function (resolve, reject) {\n        if (!elem) {\n          // no elem given\n          reject('Invalid element');\n        }\n\n        if (elem.hasOwnProperty('blockNodeWith') && elem.blockNodeWith) {\n          // already blocked\n          resolve(elem.blockNodeWith);\n        }\n\n        var originHeight = elem.offsetHeight;\n        var originWidth = elem.offsetWidth;\n        var originPositionTop = window.scrollY + elem.getBoundingClientRect().top;\n        var originPositionLeft = window.scrollX + elem.getBoundingClientRect().left;\n        var blockerContainer = document.createElement('div');\n        var observer = new MutationObserver(function (mutationsList, observer) {\n          mutationsList.forEach(function (mutationRecord) {\n            mutationRecord.removedNodes.forEach(function (node) {\n              if (node === elem) {\n                observer.disconnect();\n                blockerContainer.remove();\n              }\n            });\n          });\n        }); // Start observing the target node for configured mutations\n\n        observer.observe(elem.parentNode, {\n          attributes: true,\n          childList: true,\n          subtree: true\n        });\n        blockerContainer.blockNode = elem; // backreference\n\n        blockerContainer.blockObserver = observer;\n        blockerContainer.classList.add('blocker');\n        blockerContainer.style.position = 'absolute';\n        blockerContainer.style.height = originHeight + 'px';\n        blockerContainer.style.width = originWidth + 'px';\n        blockerContainer.style.top = originPositionTop + 'px';\n        blockerContainer.style.left = originPositionLeft + 'px';\n        blockerContainer.innerHTML = Blocker._hook('BLOCKER_INNER_HTML_BEFORE_OVERLAY', blockerContainer.innerHTML);\n        blockerContainer.innerHTML = '<div class=\"overlay\"></div>';\n        blockerContainer.innerHTML = Blocker._hook('BLOCKER_INNER_HTML_AFTER_OVERLAY', blockerContainer.innerHTML); // save reference in origin\n\n        elem.blockNodeWith = blockerContainer;\n        document.body = Blocker._hook('DOCUMENT_BODY_BEFORE_APPEND', document.body);\n        document.body.appendChild(blockerContainer);\n        document.body = Blocker._hook('DOCUMENT_BODY_AFTER_APPEND', document.body); // reset decorators\n\n        Blocker._decorators = {};\n        resolve(blockerContainer);\n      });\n    }\n    /**\n     * List of decorators in format:\n     * ```\n     * [\n     *  {decorator: <DecoratorName>, options: <DecoratorSpecificOption>}\n     * ]\n     * ```\n     * @param decorators {{decorator: BlockerDecorator, options: <any>}[]}\n     * @returns {Blocker}\n     */\n\n  }, {\n    key: \"with\",\n    value: function _with(decorators) {\n      if (!Array.isArray(decorators)) {\n        return Blocker;\n      }\n\n      Blocker._decorators = {};\n      decorators.forEach(function (decorator) {\n        if (decorator.hasOwnProperty('decorator') && decorator.decorator.hasOwnProperty('when') && decorator.decorator.when().hasOwnProperty('event') && decorator.decorator.when().hasOwnProperty('callable')) {\n          var eventName = decorator.decorator.when().event;\n\n          if (!Blocker._decorators.hasOwnProperty(eventName)) {\n            Blocker._decorators[eventName] = [];\n          }\n\n          Blocker._decorators[eventName].push(decorator);\n        }\n      });\n      return Blocker;\n    }\n    /**\n     *\n     * @param name {string}\n     * @param content <any>\n     */\n\n  }, {\n    key: \"_hook\",\n    value: function _hook(name, content) {\n      if (!Blocker._decorators || !Blocker._decorators.hasOwnProperty(name)) {\n        return content;\n      }\n\n      Blocker._decorators[name].forEach(function (decorator) {\n        content = decorator.decorator.when().callable(content, decorator.options);\n      });\n\n      return content;\n    }\n    /**\n     *\n     * @param elem {HTMLElement}\n     * @returns {Promise<any>}\n     */\n\n  }, {\n    key: \"unblock\",\n    value: function unblock(elem) {\n      return new Promise(function (resolve, reject) {\n        if (!elem) {\n          // no elem given\n          reject('Invalid element');\n          return;\n        }\n\n        if (!elem.hasOwnProperty('blockNodeWith') || !elem.blockNodeWith || !elem.blockNodeWith.hasOwnProperty('blockObserver')) {\n          // nothing to unblock\n          reject('Nothing to unblock');\n          return;\n        }\n\n        elem.blockNodeWith.blockObserver.disconnect(); // disconnect observer\n\n        elem.blockNodeWith.remove(); // remove element\n\n        elem.blockNodeWith = null; // set reference to null\n\n        resolve(elem);\n      });\n    }\n  }]);\n\n  return Blocker;\n}();\n\n//# sourceURL=webpack://BlockElement/./src/Blocker.js?");

/***/ }),

/***/ "./src/BlockerDecorator.js":
/*!*********************************!*\
  !*** ./src/BlockerDecorator.js ***!
  \*********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nfunction _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError(\"Cannot call a class as a function\"); } }\n\nfunction _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if (\"value\" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }\n\nfunction _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }\n\nmodule.exports =\n/*#__PURE__*/\nfunction () {\n  function BlockerDecorator() {\n    _classCallCheck(this, BlockerDecorator);\n\n    if ((this instanceof BlockerDecorator ? this.constructor : void 0) === BlockerDecorator) {\n      throw new TypeError('Cannot construct Abstract instances directly');\n    }\n  }\n  /**\n   *\n   * @returns {{callable: (function(HTMLElement, JSON): HTMLElement), event: string}}\n   */\n\n\n  _createClass(BlockerDecorator, null, [{\n    key: \"when\",\n    value: function when() {\n      throw new TypeError('Must override method BlockerDecorator.when');\n    }\n  }]);\n\n  return BlockerDecorator;\n}();\n\n//# sourceURL=webpack://BlockElement/./src/BlockerDecorator.js?");

/***/ }),

/***/ "./src/Message.js":
/*!************************!*\
  !*** ./src/Message.js ***!
  \************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nfunction _typeof(obj) { if (typeof Symbol === \"function\" && typeof Symbol.iterator === \"symbol\") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === \"function\" && obj.constructor === Symbol && obj !== Symbol.prototype ? \"symbol\" : typeof obj; }; } return _typeof(obj); }\n\nfunction _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError(\"Cannot call a class as a function\"); } }\n\nfunction _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if (\"value\" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }\n\nfunction _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }\n\nfunction _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === \"object\" || typeof call === \"function\")) { return call; } return _assertThisInitialized(self); }\n\nfunction _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError(\"this hasn't been initialised - super() hasn't been called\"); } return self; }\n\nfunction _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }\n\nfunction _inherits(subClass, superClass) { if (typeof superClass !== \"function\" && superClass !== null) { throw new TypeError(\"Super expression must either be null or a function\"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }\n\nfunction _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }\n\nvar BlockerDecorator = __webpack_require__(/*! ./BlockerDecorator */ \"./src/BlockerDecorator.js\");\n\nmodule.exports =\n/*#__PURE__*/\nfunction (_BlockerDecorator) {\n  _inherits(Message, _BlockerDecorator);\n\n  function Message() {\n    _classCallCheck(this, Message);\n\n    return _possibleConstructorReturn(this, _getPrototypeOf(Message).apply(this, arguments));\n  }\n\n  _createClass(Message, null, [{\n    key: \"when\",\n\n    /**\n     *\n     * @returns {{callable: (function(HTMLElement, JSON): HTMLElement), event: string}}\n     */\n    value: function when() {\n      return {\n        event: 'BLOCKER_INNER_HTML_AFTER_OVERLAY',\n        callable: Message.onAfterOverlay\n      };\n    }\n    /**\n     *\n     * @param blockerElementInnerHTML {string}\n     * @param message {string}\n     * @returns {string}\n     */\n\n  }, {\n    key: \"onAfterOverlay\",\n    value: function onAfterOverlay(blockerElementInnerHTML, message) {\n      if ('string' === typeof message) {\n        blockerElementInnerHTML += '<div class=\"message\">' + message + '</div>';\n      }\n\n      return blockerElementInnerHTML;\n    }\n  }]);\n\n  return Message;\n}(BlockerDecorator);\n\n//# sourceURL=webpack://BlockElement/./src/Message.js?");

/***/ })

/******/ });
});