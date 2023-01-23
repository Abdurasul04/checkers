/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./resources/js/app.js":
/*!*****************************!*\
  !*** ./resources/js/app.js ***!
  \*****************************/
/***/ (() => {

var selectedColor = "rgb(22, 94, 78)";
var hoverColor = "rgb(163, 30, 30)"; //Helpers

function getBackgroundColorColorOfPlaceById(a, b) {
  return document.getElementById("place-".concat(a, "-").concat(b)).style.background;
}

function isBackgroundColorOfPlaceById(a, b, color) {
  return document.getElementById("place-".concat(a, "-").concat(b)).style.background === color;
}

function setBackgroundColorOfPlaceById(a, b, color) {
  document.getElementById("place-".concat(a, "-").concat(b)).style.background = color;
}

function getBackgroundColorColorOfItemById(a, b) {
  return document.getElementById("item-".concat(a, "-").concat(b)).style.background;
}

function isBackgroundColorOfItemById(a, b, color) {
  return document.getElementById("item-".concat(a, "-").concat(b)).style.background === color;
}

function setBackgroundColorOfItemById(a, b, color) {
  document.getElementById("item-".concat(a, "-").concat(b)).style.background = color;
}

function isItemHere(a, b) {
  return document.getElementById("item-".concat(a, "-").concat(b)) != null;
}

function getItemClasses(a, b) {
  return document.getElementById("item-".concat(a, "-").concat(b)).classList;
}

function putItemToPlace(a, b) {
  document.getElementById("place-".concat(a, "-").concat(b)).innerHTML = "<div class=\"item\" id=\"item-".concat(a, "-").concat(b, "\"></div>");
}

function cutItem(a, b) {
  document.getElementById("item-".concat(a, "-").concat(b)).remove();
}

function scoreUpdate() {
  document.getElementById('score_mine').innerHTML = 12 - document.querySelectorAll('.enemy').length;
  document.getElementById('score_enemy').innerHTML = 12 - document.querySelectorAll('.mine').length;
}

function checkIfPlayerCanTakeAFigurine(j, i, r, c) {
  return (c + 2 === i || c - 2 === i) && (r + 2 === j || r - 2 === j) && isItemHere((j + r) / 2, (i + c) / 2) && (getItemClasses(r, c)[1] == 'mine' && getItemClasses((j + r) / 2, (i + c) / 2)[1] == 'enemy' || getItemClasses(r, c)[1] == 'enemy' && getItemClasses((j + r) / 2, (i + c) / 2)[1] == 'mine');
} //App


window.itemSelect = function (j, i) {
  console.log("it works!", j, i);

  if (isItemHere(j, i)) {
    for (var r = 1; r < 9; r++) {
      for (var c = 1; c < 9; c++) {
        if (isBackgroundColorOfPlaceById(r, c, selectedColor)) setBackgroundColorOfPlaceById(r, c, "black");
      }
    }

    setBackgroundColorOfPlaceById(j, i, selectedColor);
  }
};

window.mover = function (j, i) {
  if ((j + i) % 2 === 0 && !isBackgroundColorOfPlaceById(j, i, selectedColor)) setBackgroundColorOfPlaceById(j, i, hoverColor);
};

window.mout = function (j, i) {
  if ((j + i) % 2 === 0 && !isBackgroundColorOfPlaceById(j, i, selectedColor)) setBackgroundColorOfPlaceById(j, i, "black");
};

window.moveItem = function (j, i) {
  if ((j + i) % 2 === 0 && !isItemHere(j, i)) {
    //Двигатся монут только в черных зонах и на свободные клетки
    for (var r = 1; r < 9; r++) {
      //Перебираем ряды
      for (var c = 1; c < 9; c++) {
        //перебираем колонны
        if (!isBackgroundColorOfPlaceById(r, c, selectedColor)) continue;else if ((c + 1 === i || c - 1 === i) && (getItemClasses(r, c)[1] == 'mine' && r - 1 == j || getItemClasses(r, c)[1] == 'enemy' && r + 1 == j)) {
          putItemToPlace(j, i);
          getItemClasses(r, c)[1] == 'mine' ? getItemClasses(j, i).add('mine') : getItemClasses(j, i).add('enemy');
          document.getElementById("place-" + r + "-" + c).style.pointerEvents = 'auto';
          setBackgroundColorOfPlaceById(r, c, "black");
          cutItem(r, c);
          queue();
        } else if (checkIfPlayerCanTakeAFigurine(j, i, r, c)) {
          putItemToPlace(j, i);
          getItemClasses(r, c)[1] == 'mine' ? getItemClasses(j, i).add('mine') : getItemClasses(j, i).add('enemy');
          setBackgroundColorOfPlaceById(r, c, "black");
          document.getElementById("place-".concat(r, "-").concat(c)).style.pointerEvents = 'auto';
          document.getElementById("place-".concat((j + r) / 2, "-").concat((i + c) / 2)).style.pointerEvents = 'auto';
          cutItem(r, c);
          cutItem((j + r) / 2, (i + c) / 2);
          scoreUpdate();
          if (checkIfPlayerCanTakeAFigurine(j + 2, i + 2, j, i)) return;else if (checkIfPlayerCanTakeAFigurine(j - 2, i - 2, j, i)) return;else if (checkIfPlayerCanTakeAFigurine(j + 2, i - 2, j, i)) return;else if (checkIfPlayerCanTakeAFigurine(j - 2, i + 2, j, i)) return;else {
            queue();
          }
        }
      }
    }
  }
};

var turn = prompt("choose first starting side (mine or enemy)", "mine");
turn == 'mine' ? turn = 'enemy' : turn = 'mine';
document.querySelectorAll(".".concat(turn)).forEach(function (el) {
  return el.parentElement.style.pointerEvents = 'none';
});
turn == 'mine' ? turn = 'enemy' : turn = 'mine';

window.queue = function () {
  console.log("disabling");
  document.querySelectorAll(".".concat(turn)).forEach(function (el) {
    return el.parentElement.style.pointerEvents = 'none';
  });
  turn == 'mine' ? turn = 'enemy' : turn = 'mine';
  document.querySelectorAll(".".concat(turn)).forEach(function (el) {
    return el.parentElement.style.pointerEvents = 'auto';
  });
};

window.step = function () {//
};

/***/ }),

/***/ "./resources/scss/app.scss":
/*!*********************************!*\
  !*** ./resources/scss/app.scss ***!
  \*********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = __webpack_modules__;
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/chunk loaded */
/******/ 	(() => {
/******/ 		var deferred = [];
/******/ 		__webpack_require__.O = (result, chunkIds, fn, priority) => {
/******/ 			if(chunkIds) {
/******/ 				priority = priority || 0;
/******/ 				for(var i = deferred.length; i > 0 && deferred[i - 1][2] > priority; i--) deferred[i] = deferred[i - 1];
/******/ 				deferred[i] = [chunkIds, fn, priority];
/******/ 				return;
/******/ 			}
/******/ 			var notFulfilled = Infinity;
/******/ 			for (var i = 0; i < deferred.length; i++) {
/******/ 				var [chunkIds, fn, priority] = deferred[i];
/******/ 				var fulfilled = true;
/******/ 				for (var j = 0; j < chunkIds.length; j++) {
/******/ 					if ((priority & 1 === 0 || notFulfilled >= priority) && Object.keys(__webpack_require__.O).every((key) => (__webpack_require__.O[key](chunkIds[j])))) {
/******/ 						chunkIds.splice(j--, 1);
/******/ 					} else {
/******/ 						fulfilled = false;
/******/ 						if(priority < notFulfilled) notFulfilled = priority;
/******/ 					}
/******/ 				}
/******/ 				if(fulfilled) {
/******/ 					deferred.splice(i--, 1)
/******/ 					var r = fn();
/******/ 					if (r !== undefined) result = r;
/******/ 				}
/******/ 			}
/******/ 			return result;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/jsonp chunk loading */
/******/ 	(() => {
/******/ 		// no baseURI
/******/ 		
/******/ 		// object to store loaded and loading chunks
/******/ 		// undefined = chunk not loaded, null = chunk preloaded/prefetched
/******/ 		// [resolve, reject, Promise] = chunk loading, 0 = chunk loaded
/******/ 		var installedChunks = {
/******/ 			"/js/app": 0,
/******/ 			"css/app": 0
/******/ 		};
/******/ 		
/******/ 		// no chunk on demand loading
/******/ 		
/******/ 		// no prefetching
/******/ 		
/******/ 		// no preloaded
/******/ 		
/******/ 		// no HMR
/******/ 		
/******/ 		// no HMR manifest
/******/ 		
/******/ 		__webpack_require__.O.j = (chunkId) => (installedChunks[chunkId] === 0);
/******/ 		
/******/ 		// install a JSONP callback for chunk loading
/******/ 		var webpackJsonpCallback = (parentChunkLoadingFunction, data) => {
/******/ 			var [chunkIds, moreModules, runtime] = data;
/******/ 			// add "moreModules" to the modules object,
/******/ 			// then flag all "chunkIds" as loaded and fire callback
/******/ 			var moduleId, chunkId, i = 0;
/******/ 			if(chunkIds.some((id) => (installedChunks[id] !== 0))) {
/******/ 				for(moduleId in moreModules) {
/******/ 					if(__webpack_require__.o(moreModules, moduleId)) {
/******/ 						__webpack_require__.m[moduleId] = moreModules[moduleId];
/******/ 					}
/******/ 				}
/******/ 				if(runtime) var result = runtime(__webpack_require__);
/******/ 			}
/******/ 			if(parentChunkLoadingFunction) parentChunkLoadingFunction(data);
/******/ 			for(;i < chunkIds.length; i++) {
/******/ 				chunkId = chunkIds[i];
/******/ 				if(__webpack_require__.o(installedChunks, chunkId) && installedChunks[chunkId]) {
/******/ 					installedChunks[chunkId][0]();
/******/ 				}
/******/ 				installedChunks[chunkId] = 0;
/******/ 			}
/******/ 			return __webpack_require__.O(result);
/******/ 		}
/******/ 		
/******/ 		var chunkLoadingGlobal = self["webpackChunk"] = self["webpackChunk"] || [];
/******/ 		chunkLoadingGlobal.forEach(webpackJsonpCallback.bind(null, 0));
/******/ 		chunkLoadingGlobal.push = webpackJsonpCallback.bind(null, chunkLoadingGlobal.push.bind(chunkLoadingGlobal));
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module depends on other loaded chunks and execution need to be delayed
/******/ 	__webpack_require__.O(undefined, ["css/app"], () => (__webpack_require__("./resources/js/app.js")))
/******/ 	var __webpack_exports__ = __webpack_require__.O(undefined, ["css/app"], () => (__webpack_require__("./resources/scss/app.scss")))
/******/ 	__webpack_exports__ = __webpack_require__.O(__webpack_exports__);
/******/ 	
/******/ })()
;