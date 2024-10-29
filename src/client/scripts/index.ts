//the ES equivalent of node 'const module = require("module")
import * as animate from "./animate";
import * as input from "./input";

var canvas:HTMLCanvasElement;
var context:CanvasRenderingContext2D;

function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}

window.onload = ()=>{
    let tempCanvas = document.getElementById("canvas")
    if (tempCanvas === null) {
        throw "Canvas is null"
    }
    canvas = <HTMLCanvasElement>tempCanvas;

    let tempContext = canvas.getContext("2d");
    if (tempContext === null) {
        throw "Canvas Context is null"
    }
    context = tempContext

    animate.startAnimation(context);
    resizeCanvas();
};

window.onresize = ()=>{
    resizeCanvas();
};

window.onkeydown = input.keyDown;
window.onkeyup = input.keyUp;