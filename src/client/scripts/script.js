"use strict";
var canvas;
function resizeCanvas() {
    console.log("resized canvas");
    canvas.width = window.innerWidth - 10;
    canvas.height = window.innerHeight - 10;
}
window.onload = () => {
    canvas = document.getElementById("canvas");
    resizeCanvas();
    console.log(`${canvas.width}, ${canvas.height}`);
};
window.onresize = () => {
    console.log;
    resizeCanvas();
    console.log(`${canvas.width}, ${canvas.height}`);
};
