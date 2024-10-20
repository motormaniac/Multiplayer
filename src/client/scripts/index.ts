var canvas:HTMLCanvasElement;

function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}

window.onload = ()=>{
    canvas = <HTMLCanvasElement>document.getElementById("canvas");
    resizeCanvas();
};

window.onresize = ()=>{
    resizeCanvas();
};