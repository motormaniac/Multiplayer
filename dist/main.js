/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/client/scripts/animate.js":
/*!***************************************!*\
  !*** ./src/client/scripts/animate.js ***!
  \***************************************/
/***/ ((__unused_webpack_module, exports) => {

eval("\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\nexports.startAnimation = startAnimation;\nexports.stopAnimation = stopAnimation;\nlet animationId = 0; //the current id of the animation frame (requestAnimationFrame returns its id)\nlet context;\nfunction startAnimation(ctx) {\n    context = ctx;\n    animationId = requestAnimationFrame(update);\n}\nfunction stopAnimation() {\n    cancelAnimationFrame(animationId);\n}\nfunction update() {\n    animationId = requestAnimationFrame(update);\n    context.fillStyle = \"#ffffff\";\n    context.fillRect(100, 100, 50, 50);\n}\n\n\n//# sourceURL=webpack://multiplayer/./src/client/scripts/animate.js?");

/***/ }),

/***/ "./src/client/scripts/index.js":
/*!*************************************!*\
  !*** ./src/client/scripts/index.js ***!
  \*************************************/
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

eval("\nconst animate = __webpack_require__(/*! ./animate */ \"./src/client/scripts/animate.js\");\nconst input = __webpack_require__(/*! ./input */ \"./src/client/scripts/input.js\");\nvar canvas;\nvar context;\nfunction resizeCanvas() {\n    canvas.width = window.innerWidth;\n    canvas.height = window.innerHeight;\n}\nwindow.onload = () => {\n    let tempCanvas = document.getElementById(\"canvas\");\n    if (tempCanvas === null) {\n        throw \"Canvas is null\";\n    }\n    canvas = tempCanvas;\n    let tempContext = canvas.getContext(\"2d\");\n    if (tempContext === null) {\n        throw \"Canvas Context is null\";\n    }\n    context = tempContext;\n    animate.startAnimation(context);\n    resizeCanvas();\n};\nwindow.onresize = () => {\n    resizeCanvas();\n};\n\n\n//# sourceURL=webpack://multiplayer/./src/client/scripts/index.js?");

/***/ }),

/***/ "./src/client/scripts/input.js":
/*!*************************************!*\
  !*** ./src/client/scripts/input.js ***!
  \*************************************/
/***/ (() => {

eval("\nconst supportedKeys = [];\nwindow.onkeydown = (event) => {\n    let para = document.getElementById(\"para\");\n    para.innerHTML = `Key: ${event.key} Code: ${event.code}`;\n};\n\n\n//# sourceURL=webpack://multiplayer/./src/client/scripts/input.js?");

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
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = __webpack_require__("./src/client/scripts/index.js");
/******/ 	
/******/ })()
;