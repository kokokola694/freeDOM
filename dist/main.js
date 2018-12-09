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

eval("const DOMNodeCollection = __webpack_require__(/*! ./dom_node_collection */ \"./src/dom_node_collection.js\");\nlet docLoaded = false;\nconst functionQueue = [];\n\nwindow.$l = (input) => {\n  if (typeof input === \"function\") {\n    if (!docLoaded) {\n      functionQueue.push(input);\n    } else {\n      input();\n    }\n  } else if (input instanceof HTMLElement) {\n    return new DOMNodeCollection([input]);\n  } else if (typeof input === \"string\") {\n    return new DOMNodeCollection(Array.from(document.querySelectorAll(input)));\n  }\n};\n\nwindow.$l.extend = (...args) => {\n  let merged = args[0];\n  args.slice(1).forEach(arg => Object.assign(merged, arg));\n  return merged;\n}\n\nwindow.$l.ajax = (options) => {\n  const defaultRequest = {\n    method: \"GET\",\n    url: \"\",\n    success: () => {},\n    error: () => {},\n    data: {},\n    contentType: 'application/x-www-form-urlencoded; charset=UTF-8',\n    dataType: 'json'\n  };\n\n  const request = window.$l.extend(defaultRequest, options);\n\n  return new Promise (\n    function (resolve, reject) {\n      const xhr = new XMLHttpRequest();\n      xhr.open(request.method, request.url);\n      xhr.onload = () => {\n          resolve(JSON.parse(xhr.response));\n      };\n      xhr.onerror = () => {\n          reject(JSON.parse(xhr.statusText));\n      };\n      xhr.send(JSON.stringify(request.data));\n    }\n  )\n}\n\ndocument.addEventListener(\"DOMContentLoaded\", function(){\n  docLoaded = true;\n  functionQueue.forEach(func => func());\n  // retrieveCategories();\n  $l('.start-btn').on('click', (e) => {\n    e.preventDefault();\n    $l('.start-btn').html(\"RESTART\");\n    $l('.score').html(`SCORE: 0 / 5`);\n    retrieveQuestions(5);\n  });\n});\n\n// const retrieveCategories = () => {\n//   const select = $l('select');\n//   $l.ajax({\n//     method: \"GET\",\n//     url: \"https://opentdb.com/api_category.php\"\n//   }).then(categories => {\n//     select.empty();\n//     categories.trivia_categories.forEach( category => {\n//       select.append(`<option id='opt-${category.id}' value='${category.id}'>${category.name}</option>`)\n//     });\n//     categories.trivia_categories.forEach( category => {\n//       $l(`#opt-${category.id}`).on('click', (e) => {\n//         e.preventDefault();\n//         $l('select').attr('val', category.id);\n//       })\n//     })\n//   })\n// }\n\nconst retrieveQuestions = (n) => {\n  $l.ajax({\n    method: \"GET\",\n    url: `https://opentdb.com/api.php?amount=${n}`\n  }).then(response => displayQuestions(response.results));\n}\n\nconst displayQuestions = (results) => {\n  const list = $l('.question-list');\n  list.empty();\n  results.forEach( (result, i) => {\n    list.append(`\n      <li id=\"q-${i}\" class=\"question\">\n        <h3>${result.question}</h3>\n        <ul class=\"ans-list ans-${i}\"></ul>\n      </li>`\n    );\n  });\n  results.forEach((result, i) => {\n    setupAnswers(result, i);\n  })\n  $l('.question-list').removeClass('hidden');\n\n}\n\nconst shuffle = (array) => {\n  for (let i = array.length-1; i >=0; i--) {\n    const randomIndex = Math.floor(Math.random()*(i+1));\n    const itemAtIndex = array[randomIndex];\n    array[randomIndex] = array[i];\n    array[i] = itemAtIndex;\n  }\n  return array;\n}\n\nconst setupAnswers = (result, i) => {\n  const answers = $l(`.ans-${i}`);\n  let result_ans = result.incorrect_answers.concat([result.correct_answer]);\n  result_ans = shuffle(result_ans);\n  result_ans.forEach((ans, j) => {\n    if (result.correct_answer === ans) {\n      answers.append(`<li id='q-${i}-c-${j}' class='ans-choice r'>${ans}</li>`);\n    } else {\n      answers.append(`<li id='q-${i}-c-${j}' class='ans-choice'>${ans}</li>`);\n    }\n  });\n\n  result_ans.forEach((ans, j) => {\n    $l(`#q-${i}-c-${j}`).on('click', () => {\n      if (result.correct_answer === answers.children().nodes[j].innerHTML) {\n        $l(`#q-${i}`).removeClass('red');\n        $l(`#q-${i}`).addClass('green');\n      } else {\n        $l(`#q-${i}`).removeClass('green');\n        $l(`#q-${i}`).addClass('red');\n      }\n      $l(`#q-${i}-c-${j}`).addClass('bold');\n      $l(`#q-${i}-c-${j}`).addClass('highlight');\n      $l(`.ans-${i}`).children().off('click');\n      const score = $l('.green').nodes.length;\n      const red = $l('.red').nodes.length;\n      $l('.score').html(`SCORE: ${score} / 5`);\n      if (red + score === 5) {\n        $l('.score').addClass('bold');\n        $l('.r').addClass('correct');\n        $l('.r').addClass('bold');\n      }\n    })\n  })\n\n}\n\n\n//# sourceURL=webpack:///./src/index.js?");

/***/ })

/******/ });