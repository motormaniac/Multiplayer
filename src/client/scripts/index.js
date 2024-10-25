"use strict";
var canvas;
function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}
window.onload = () => {
    canvas = document.getElementById("canvas");
    resizeCanvas();
};
window.onresize = () => {
    resizeCanvas();
};
