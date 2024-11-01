"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.startAnimation = startAnimation;
exports.stopAnimation = stopAnimation;
const input_1 = require("./input");
let animationId = 0; //the current id of the animation frame (requestAnimationFrame returns its id)
let ctx;
let canvas;
function startAnimation(_canvas, _ctx) {
    ctx = _ctx;
    canvas = _canvas;
    animationId = requestAnimationFrame(update);
}
function stopAnimation() {
    cancelAnimationFrame(animationId);
}
let x = 0;
let y = 0;
function update() {
    (0, input_1.inputUpdate)(performance.now());
    if (input_1.inputs.right.isPressed) {
        x += 10;
    }
    if (input_1.inputs.left.isPressed) {
        x -= 10;
    }
    if (input_1.inputs.up.isPressed) {
        y -= 10;
    }
    if (input_1.inputs.down.isPressed) {
        y += 10;
    }
    animationId = requestAnimationFrame(update);
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = "#ffffff";
    ctx.fillRect(x, y, 50, 50);
}
