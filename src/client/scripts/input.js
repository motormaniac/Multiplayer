"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.inputs = void 0;
exports.inputUpdate = inputUpdate;
exports.keyDown = keyDown;
exports.keyUp = keyUp;
/**Time since window was loaded at the beginning of each frame (milliseconds)*/
var frameTime = 0;
class ComputerInput {
    /**Fills inputMap with ComputerInput instances */
    static initInputMap() {
        for (let value of Object.values(exports.inputs)) { //iterates through the object
            ComputerInput.inputMap.set(value.keyCode, value);
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
    /**
     * @param code corresponding keycode (event.code)
     * @param onKeyDown optional callback when key is pressed
     * @param onKeyUp optional callback when key is released
     */
    constructor(code, onKeyDown = () => { }, onKeyUp = () => { }) {
        /**Corresponding keycode (event.code) */
        this.keyCode = "";
        this.isPressed = false;
        /**Time when key was pressed (millis) */
        this.keyDownTime = 0;
        /**Time when key was released (millis) */
        this.keyUpTime = 0;
        /**optional callback activated whenever this key is pressed */
        this.onKeyDown = () => { };
        /**optional callback activated whenever this key is released */
        this.onKeyUp = () => { };
        this.keyCode = code;
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
/**Look up table; uses keyboard event code to find associated ComputerInput object */
ComputerInput.inputMap = new Map();
/**Called at the beginning of every frame */
function inputUpdate(time) {
    frameTime = time;
}
function keyDown(event) {
    console.log(event.code);
    let input = ComputerInput.inputMap.get(event.code);
    if (input) {
        input.setKeyDown(event);
    }
}
function keyUp(event) {
    console.log(event.code);
    let input = ComputerInput.inputMap.get(event.code);
    if (input) {
        input.setKeyUp(event);
    }
}
ComputerInput.initInputs();
ComputerInput.initInputMap();
