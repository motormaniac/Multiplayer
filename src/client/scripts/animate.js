"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.startAnimation = startAnimation;
exports.stopAnimation = stopAnimation;
let animationId = 0; //the current id of the animation frame (requestAnimationFrame returns its id)
let context;
function startAnimation(ctx) {
    context = ctx;
    animationId = requestAnimationFrame(update);
}
function stopAnimation() {
    cancelAnimationFrame(animationId);
}
function update() {
    animationId = requestAnimationFrame(update);
    context.fillStyle = "#ffffff";
    context.fillRect(100, 100, 50, 50);
}
