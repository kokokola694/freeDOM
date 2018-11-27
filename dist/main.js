/******/ (function(modules) { // webpackBootstrap
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
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/index.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/dom_node_collection.js":
/*!************************************!*\
  !*** ./src/dom_node_collection.js ***!
  \************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("class DOMNodeCollection {\n  constructor(nodes) {\n    this.nodes = nodes;\n  }\n\n  html (input) {\n    if (typeof input === \"string\") {\n      this.nodes.forEach(node => node.innerHTML = input);\n    } else {\n      return this.nodes[0].innerHTML;\n    }\n  }\n\n  empty () {\n    this.html('');\n  }\n\n  append (input) {\n    if (input.constructor.name === \"DOMNodeCollection\") {\n      for (let i = 0; i < this.nodes.length; i++) {\n        for (let j = 0; j < input.nodes.length; j++) {\n          this.nodes[i].innerHTML += input.nodes[j].outerHTML;\n        }\n      }\n    } else if (input instanceof HTMLElement) {\n      this.nodes.forEach(node => node.innerHTML += input.outerHTML)\n    } else if (typeof input === \"string\") {\n      this.nodes.forEach(node => node.innerHTML += input);\n    }\n  }\n\n  attr (attribute, value) {\n    if (value) {\n      this.nodes.forEach(node => node.setAttribute(attribute, value));\n    } else {\n      return this.nodes[0].getAttribute(attribute);\n    }\n  }\n\n  addClass(classStr){\n    this.nodes.forEach(node => node.classList.add(classStr));\n  }\n\n  removeClass(classStr) {\n    this.nodes.forEach(node => node.classList.remove(classStr));\n  }\n\n  children () {\n    const child = [];\n    for (let i = 0; i < this.nodes.length; i++) {\n      for (let j = 0; j < this.nodes[i].children.length; j++) {\n        child.push(this.nodes[i].children[j]);\n      }\n    }\n    return new DOMNodeCollection(child);\n  }\n\n  parent () {\n    const parents = [];\n    for (let i = 0; i < this.nodes.length; i++) {\n      if (!parents.includes(this.nodes[i].parentNode)) {\n        parents.push(this.nodes[i].parentNode);\n      }\n    }\n    return new DOMNodeCollection(parents);\n  }\n\n  find (selector) {\n    const nodes = [];\n    this.nodes.forEach(node => {\n        node.querySelectorAll(selector).forEach(selected => nodes.push(selected));\n    });\n    return new DOMNodeCollection(nodes);\n  }\n\n  remove () {\n    this.nodes.forEach(node => node.outerHTML = \"\");\n    this.nodes = [];\n  }\n\n  on (eventName, callback) {\n    this.nodes.forEach(node => {\n      node.addEventListener(eventName, callback);\n      node.listener = callback;\n    })\n  }\n\n  off (eventName) {\n    this.nodes.forEach(node => {\n      node.removeEventListener(eventName, node.listener);\n      node.listener = null;\n    })\n  }\n}\n\nmodule.exports = DOMNodeCollection;\n\n\n//# sourceURL=webpack:///./src/dom_node_collection.js?");

/***/ }),

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("const DOMNodeCollection = __webpack_require__(/*! ./dom_node_collection */ \"./src/dom_node_collection.js\");\nlet loaded = false;\nconst functionQueue = [];\n\nwindow.$l = (arg) => {\n  if (typeof arg === \"function\") {\n    if (!loaded) {\n      functionQueue.push(arg);\n    } else {\n      arg();\n    }\n  } else if (arg instanceof HTMLElement) {\n    return new DOMNodeCollection([arg]);\n  } else if (typeof arg === \"string\") {\n    return new DOMNodeCollection(Array.from(document.querySelectorAll(arg)));\n  }\n};\n\nwindow.$l.extend = (...args) => {\n  let merged = args[0];\n  args.slice(1).forEach(arg => Object.assign(merged, arg));\n  return merged;\n}\n\nwindow.$l.ajax = (options) => {\n  const defaultReq = {\n    method: \"GET\",\n    url: \"\",\n    success: () => {},\n    error: () => {},\n    data: {},\n    contentType: 'application/x-www-form-urlencoded; charset=UTF-8',\n  };\n\n  const request = window.$l.extend(defaultReq, options);\n  const xhr = new XMLHttpRequest();\n  xhr.open(request.method, request.url);\n  xhr.onload = () => {\n    if (xhr.status === 200) {\n      request.success(xhr.response);\n    } else {\n      request.error(xhr.response);\n    }\n  }\n  xhr.send(JSON.stringify(request.data));\n}\n\ndocument.addEventListener(\"DOMContentLoaded\", function(){\n  loaded = true;\n  functionQueue.forEach(func => func());\n});\n\n\n//# sourceURL=webpack:///./src/index.js?");

/***/ })

/******/ });