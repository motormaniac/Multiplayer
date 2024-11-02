"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.mouseOffset = exports.mousePos = exports.inputs = void 0;
exports.inputUpdate = inputUpdate;
exports.keyDown = keyDown;
exports.keyUp = keyUp;
exports.mouseMove = mouseMove;
exports.mouseDown = mouseDown;
exports.mouseUp = mouseUp;
/**Time since window was loaded at the beginning of each frame (milliseconds)*/
var frameTime = 0;
exports.mousePos = { x: 0, y: 0 };
exports.mouseOffset = { x: 0, y: 0 };
class BasicInput {
    constructor() {
        /**Corresponding keycode (event.code) */
        this.code = "";
        this.isPressed = false;
        /**Time when key was pressed (millis) */
        this.keyDownTime = 0;
        /**Time when key was released (millis) */
        this.keyUpTime = 0;
        /**optional callback activated whenever this key is pressed */
        this.onKeyDown = () => { };
        /**optional callback activated whenever this key is released */
        this.onKeyUp = () => { };
    }
    /**Fills inputMap with BasicInput instances */
    static initInputMap() {
        for (let value of Object.values(exports.inputs)) { //iterates through the object
            BasicInput.inputMap.set(value.code, value);
        }
        return this.inputMap;
    }
    /**Initializes the global variable 'inputs' with instances of ComputerInput*/
    static initInputs() {
        exports.inputs = {
            right: new ComputerInput("KeyD"),
            left: new ComputerInput("KeyA"),
            up: new ComputerInput("KeyW"),
            down: new ComputerInput("KeyS")
        };
    }
    setKeyDown(event) { }
    setKeyUp(event) { }
}
/**Look up table; uses keyboard event code to find associated ComputerInput object */
BasicInput.inputMap = new Map();
class ComputerInput extends BasicInput {
    /**
     * @param code corresponding keycode (event.code)
     * @param onKeyDown optional callback when key is pressed
     * @param onKeyUp optional callback when key is released
     */
    constructor(code, onKeyDown = () => { }, onKeyUp = () => { }) {
        super();
        this.code = code;
        this.onKeyDown = onKeyDown;
        this.onKeyUp = onKeyUp;
    }
    setKeyDown(event) {
        if (this.isPressed === false) {
            this.keyDownTime = performance.now();
            this.onKeyDown();
            this.isPressed = true;
        }
    }
    setKeyUp(event) {
        if (this.isPressed === true) {
            this.keyUpTime = performance.now();
            this.onKeyUp();
            this.isPressed = false;
        }
    }
    pressedThisFrame() {
        return this.keyUpTime <= frameTime && frameTime <= this.keyDownTime;
    }
}
class MouseInput extends BasicInput {
    setKeyDown(event) {
    }
}
/**Called at the beginning of every frame */
function inputUpdate(time) {
    frameTime = time;
}
function keyDown(event) {
    let input = ComputerInput.inputMap.get(event.code);
    if (input) {
        input.setKeyDown(event);
    }
}
function keyUp(event) {
    let input = ComputerInput.inputMap.get(event.code);
    if (input) {
        input.setKeyUp(event);
    }
}
function mouseMove(event) {
    exports.mousePos.x = event.clientX;
    exports.mousePos.y = event.clientY;
    exports.mouseOffset.x = event.movementX;
    exports.mouseOffset.y = event.movementY;
}
function mouseDown(event) {
    console.log("mosuedown");
}
function mouseUp(event) {
    console.log("mouseup");
}
BasicInput.initInputs();
BasicInput.initInputMap();
