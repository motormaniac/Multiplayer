import { inputs, inputUpdate, mousePos} from "./input";

let animationId = 0; //the current id of the animation frame (requestAnimationFrame returns its id)

let ctx:CanvasRenderingContext2D;
let canvas:HTMLCanvasElement;

export function startAnimation(_canvas:HTMLCanvasElement, _ctx:CanvasRenderingContext2D):void {
    ctx = _ctx;
    canvas = _canvas;
    animationId = requestAnimationFrame(update);
}

export function stopAnimation():void {
    cancelAnimationFrame(animationId);
}

let x:number = 0;
let y:number = 0;
function update():void {
    inputUpdate(performance.now())

    if (inputs.right.isPressed) {
        x += 10;
    }
    if (inputs.left.isPressed) {
        x -= 10;
    }
    if (inputs.up.isPressed) {
        y -= 10;
    }
    if (inputs.down.isPressed) {
        y += 10;
    }

    animationId = requestAnimationFrame(update);
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = "#ffffff";
    ctx.fillRect(x,y,50,50);
    ctx.fillStyle = "#ff0000";
    ctx.fillRect(mousePos.x, mousePos.y, 25,25)
}