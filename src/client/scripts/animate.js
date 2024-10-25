"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.startAnimation = startAnimation;
exports.stopAnimation = stopAnimation;
let animationId = 0; //the current id of the animation frame (requestAnimationFrame returns its id)
function startAnimation() {
    animationId = requestAnimationFrame(update);
}
function stopAnimation() {
    cancelAnimationFrame(animationId);
}
function update() {
    animationId = requestAnimationFrame(update);
}
