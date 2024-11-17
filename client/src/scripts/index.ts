import * as animate from "./animate";
import * as input from "./input";

window.onload = async ()=>{
    await animate.initPixi(document.body);
}

window.onkeydown = input.keyDown;
window.onkeyup = input.keyUp;
window.onmousemove = input.mouseMove;
window.onmousedown = input.mouseDown
window.onmouseup = input.mouseUp

// //the ES equivalent of node 'const module = require("module")
// import * as animate from "./animate";

// let canvas:HTMLCanvasElement;
// let context:CanvasRenderingContext2D;

// function resizeCanvas() {
//     canvas.width = window.innerWidth;
//     canvas.height = window.innerHeight;
// }

// window.onload = ()=>{    

//     animate.stopAnimation();
//     let tempCanvas = document.getElementById("canvas")
//     if (tempCanvas === null) {
//         throw "Canvas is null"
//     }
//     canvas = <HTMLCanvasElement>tempCanvas;

//     let tempContext = canvas.getContext("2d");
//     if (tempContext === null) {
//         throw "Canvas Context is null"
//     }
//     context = tempContext

//     animate.startAnimation(canvas,context);
//     resizeCanvas();
// };

// window.onresize = ()=>{
//     resizeCanvas();
// };

