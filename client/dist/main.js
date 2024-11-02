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

/***/ "./client/src/scripts/animate.js":
/*!***************************************!*\
  !*** ./client/src/scripts/animate.js ***!
  \***************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

eval("\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\nexports.startAnimation = startAnimation;\nexports.stopAnimation = stopAnimation;\nconst input_1 = __webpack_require__(/*! ./input */ \"./client/src/scripts/input.js\");\nlet animationId = 0; //the current id of the animation frame (requestAnimationFrame returns its id)\nlet ctx;\nlet canvas;\nfunction startAnimation(_canvas, _ctx) {\n    ctx = _ctx;\n    canvas = _canvas;\n    animationId = requestAnimationFrame(update);\n}\nfunction stopAnimation() {\n    cancelAnimationFrame(animationId);\n}\nlet x = 0;\nlet y = 0;\nfunction update() {\n    (0, input_1.inputUpdate)(performance.now());\n    if (input_1.inputs.right.isPressed) {\n        x += 10;\n    }\n    if (input_1.inputs.left.isPressed) {\n        x -= 10;\n    }\n    if (input_1.inputs.up.isPressed) {\n        y -= 10;\n    }\n    if (input_1.inputs.down.isPressed) {\n        y += 10;\n    }\n    animationId = requestAnimationFrame(update);\n    ctx.clearRect(0, 0, canvas.width, canvas.height);\n    ctx.fillStyle = \"#ffffff\";\n    ctx.fillRect(x, y, 50, 50);\n    ctx.fillStyle = \"#ff0000\";\n    ctx.fillRect(input_1.mousePos.x, input_1.mousePos.y, 25, 25);\n}\n\n\n//# sourceURL=webpack://multiplayer/./client/src/scripts/animate.js?");

/***/ }),

/***/ "./client/src/scripts/index.js":
/*!*************************************!*\
  !*** ./client/src/scripts/index.js ***!
  \*************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

eval("\nvar __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {\n    if (k2 === undefined) k2 = k;\n    var desc = Object.getOwnPropertyDescriptor(m, k);\n    if (!desc || (\"get\" in desc ? !m.__esModule : desc.writable || desc.configurable)) {\n      desc = { enumerable: true, get: function() { return m[k]; } };\n    }\n    Object.defineProperty(o, k2, desc);\n}) : (function(o, m, k, k2) {\n    if (k2 === undefined) k2 = k;\n    o[k2] = m[k];\n}));\nvar __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {\n    Object.defineProperty(o, \"default\", { enumerable: true, value: v });\n}) : function(o, v) {\n    o[\"default\"] = v;\n});\nvar __importStar = (this && this.__importStar) || function (mod) {\n    if (mod && mod.__esModule) return mod;\n    var result = {};\n    if (mod != null) for (var k in mod) if (k !== \"default\" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);\n    __setModuleDefault(result, mod);\n    return result;\n};\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\n//the ES equivalent of node 'const module = require(\"module\")\nconst animate = __importStar(__webpack_require__(/*! ./animate */ \"./client/src/scripts/animate.js\"));\nconst input = __importStar(__webpack_require__(/*! ./input */ \"./client/src/scripts/input.js\"));\nvar canvas;\nvar context;\nfunction resizeCanvas() {\n    canvas.width = window.innerWidth;\n    canvas.height = window.innerHeight;\n}\nwindow.onload = () => {\n    animate.stopAnimation();\n    let tempCanvas = document.getElementById(\"canvas\");\n    if (tempCanvas === null) {\n        throw \"Canvas is null\";\n    }\n    canvas = tempCanvas;\n    let tempContext = canvas.getContext(\"2d\");\n    if (tempContext === null) {\n        throw \"Canvas Context is null\";\n    }\n    context = tempContext;\n    animate.startAnimation(canvas, context);\n    resizeCanvas();\n};\nwindow.onresize = () => {\n    resizeCanvas();\n};\nwindow.onkeydown = input.keyDown;\nwindow.onkeyup = input.keyUp;\nwindow.onmousemove = input.mouseMove;\nwindow.onmousedown = input.mouseDown;\nwindow.onmouseup = input.mouseUp;\n\n\n//# sourceURL=webpack://multiplayer/./client/src/scripts/index.js?");

/***/ }),

/***/ "./client/src/scripts/input.js":
/*!*************************************!*\
  !*** ./client/src/scripts/input.js ***!
  \*************************************/
/***/ ((__unused_webpack_module, exports) => {

eval("\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\nexports.mouseOffset = exports.mousePos = exports.inputs = void 0;\nexports.inputUpdate = inputUpdate;\nexports.keyDown = keyDown;\nexports.keyUp = keyUp;\nexports.mouseMove = mouseMove;\nexports.mouseDown = mouseDown;\nexports.mouseUp = mouseUp;\n/**Time since window was loaded at the beginning of each frame (milliseconds)*/\nvar frameTime = 0;\nexports.mousePos = { x: 0, y: 0 };\nexports.mouseOffset = { x: 0, y: 0 };\nclass BasicInput {\n    constructor() {\n        /**Corresponding keycode (event.code) */\n        this.code = \"\";\n        this.isPressed = false;\n        /**Time when key was pressed (millis) */\n        this.keyDownTime = 0;\n        /**Time when key was released (millis) */\n        this.keyUpTime = 0;\n        /**optional callback activated whenever this key is pressed */\n        this.onKeyDown = () => { };\n        /**optional callback activated whenever this key is released */\n        this.onKeyUp = () => { };\n    }\n    /**Fills inputMap with BasicInput instances */\n    static initInputMap() {\n        for (let value of Object.values(exports.inputs)) { //iterates through the object\n            BasicInput.inputMap.set(value.code, value);\n        }\n        return this.inputMap;\n    }\n    /**Initializes the global variable 'inputs' with instances of ComputerInput*/\n    static initInputs() {\n        exports.inputs = {\n            right: new ComputerInput(\"KeyD\"),\n            left: new ComputerInput(\"KeyA\"),\n            up: new ComputerInput(\"KeyW\"),\n            down: new ComputerInput(\"KeyS\")\n        };\n    }\n    setKeyDown(event) { }\n    setKeyUp(event) { }\n}\n/**Look up table; uses keyboard event code to find associated ComputerInput object */\nBasicInput.inputMap = new Map();\nclass ComputerInput extends BasicInput {\n    /**\n     * @param code corresponding keycode (event.code)\n     * @param onKeyDown optional callback when key is pressed\n     * @param onKeyUp optional callback when key is released\n     */\n    constructor(code, onKeyDown = () => { }, onKeyUp = () => { }) {\n        super();\n        this.code = code;\n        this.onKeyDown = onKeyDown;\n        this.onKeyUp = onKeyUp;\n    }\n    setKeyDown(event) {\n        if (this.isPressed === false) {\n            this.keyDownTime = performance.now();\n            this.onKeyDown();\n            this.isPressed = true;\n        }\n    }\n    setKeyUp(event) {\n        if (this.isPressed === true) {\n            this.keyUpTime = performance.now();\n            this.onKeyUp();\n            this.isPressed = false;\n        }\n    }\n    pressedThisFrame() {\n        return this.keyUpTime <= frameTime && frameTime <= this.keyDownTime;\n    }\n}\nclass MouseInput extends BasicInput {\n    setKeyDown(event) {\n    }\n}\n/**Called at the beginning of every frame */\nfunction inputUpdate(time) {\n    frameTime = time;\n}\nfunction keyDown(event) {\n    let input = ComputerInput.inputMap.get(event.code);\n    if (input) {\n        input.setKeyDown(event);\n    }\n}\nfunction keyUp(event) {\n    let input = ComputerInput.inputMap.get(event.code);\n    if (input) {\n        input.setKeyUp(event);\n    }\n}\nfunction mouseMove(event) {\n    exports.mousePos.x = event.clientX;\n    exports.mousePos.y = event.clientY;\n    exports.mouseOffset.x = event.movementX;\n    exports.mouseOffset.y = event.movementY;\n}\nfunction mouseDown(event) {\n    console.log(\"mosuedown\");\n}\nfunction mouseUp(event) {\n    console.log(\"mouseup\");\n}\nBasicInput.initInputs();\nBasicInput.initInputMap();\n\n\n//# sourceURL=webpack://multiplayer/./client/src/scripts/input.js?");

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
/******/ 		__webpack_modules__[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module is referenced by other modules so it can't be inlined
/******/ 	var __webpack_exports__ = __webpack_require__("./client/src/scripts/index.js");
/******/ 	
/******/ })()
;