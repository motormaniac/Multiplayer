import {Application, Graphics, Ticker} from "pixi.js";
import { inputs, inputUpdate, mousePos} from "./input";

export let elapsedTime:number=0;
export const app:Application = new Application();

/**
 * Initializes pixi app
 * @param element The element pixi should attach a canavas to
 */
export async function initPixi(element:HTMLElement) { 
    console.log("started pixi");
    // app = new Application();
    await app.init({resizeTo: window});
    element.appendChild(app.canvas);

    let player:Graphics = new Graphics()
        .rect(0,0,50,50)
        .fill("white");
    app.stage.addChild(player);

    let mouse:Graphics = new Graphics()
        .circle(0,0,10)
        .fill("red");
    app.stage.addChild(mouse)

    app.ticker.add((ticker:Ticker)=>{
        elapsedTime += ticker.deltaTime;
        inputUpdate();

        if (inputs.right.isPressed) {
            player.x += 10;
        }
        if (inputs.left.isPressed) {
            player.x -= 10;
        }
        if (inputs.up.isPressed) {
            player.y -= 10;
        }
        if (inputs.down.isPressed) {
            player.y += 10;
        }
        mouse.x = mousePos.x;
        mouse.y = mousePos.y;
    })
}


// let animationId = 0; //the current id of the animation frame (requestAnimationFrame returns its id)

// let ctx:CanvasRenderingContext2D;
// let canvas:HTMLCanvasElement;

// export function startAnimation(_canvas:HTMLCanvasElement, _ctx:CanvasRenderingContext2D):void {
//     ctx = _ctx;
//     canvas = _canvas;
//     animationId = requestAnimationFrame(update);
// }

// export function stopAnimation():void {
//     cancelAnimationFrame(animationId);
// }

// let x:number = 0;
// let y:number = 0;
// function update():void {
//     inputUpdate(performance.now())

//     if (inputs.right.isPressed) {
//         x += 10;
//     }
//     if (inputs.left.isPressed) {
//         x -= 10;
//     }
//     if (inputs.up.isPressed) {
//         y -= 10;
//     }
//     if (inputs.down.isPressed) {
//         y += 10;
//     }

//     animationId = requestAnimationFrame(update);
//     ctx.clearRect(0, 0, canvas.width, canvas.height);
//     ctx.fillStyle = "#ffffff";
//     ctx.fillRect(x,y,50,50);
//     ctx.fillStyle = "#ff0000";
//     ctx.fillRect(mousePos.x, mousePos.y, 25,25)
// }