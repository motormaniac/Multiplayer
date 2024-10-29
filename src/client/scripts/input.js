"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.inputUpdate = inputUpdate;
exports.keyDown = keyDown;
exports.keyUp = keyUp;
const supportedKeyCodes = ["KeyA", "KeyW", "KeyD", "KeyS"];
var inputs = ;
inputInit();
class Input {
}
class ComputerInput extends Input {
    constructor(key) {
        super();
        this.key = "";
        this.keyDownTime = null;
        this.keyUpTime = null;
        this.key = key;
    }
    keyDown(event) {
    }
    keyUp(event) {
    }
}
/**
 * This function is called every single frame update
 */
function inputUpdate() {
}
function inputInit() {
    console.log("initialized input");
    for (let key of supportedKeyCodes) {
        inputMap.set(key, new Input(key));
    }
}
function keyDown(event) {
    let para = document.getElementById("para");
    para.innerHTML = `Key: ${event.key} Code: ${event.code}`;
    inputMap;
}
function keyUp(event) {
}
