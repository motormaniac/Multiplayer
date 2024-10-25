import { startAnimation } from "./animate";

var canvas:HTMLCanvasElement;

function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}

window.onload = ()=>{
    canvas = <HTMLCanvasElement>document.getElementById("canvas");
    startAnimation();
    resizeCanvas();
};

window.onresize = ()=>{
    resizeCanvas();
};