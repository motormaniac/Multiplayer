"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.app = exports.elapsedTime = void 0;
exports.initPixi = initPixi;
const pixi_js_1 = require("pixi.js");
const input_1 = require("./input");
exports.elapsedTime = 0;
exports.app = new pixi_js_1.Application();
/**
 * Initializes pixi app
 * @param element The element pixi should attach a canavas to
 */
function initPixi(element) {
    return __awaiter(this, void 0, void 0, function* () {
        console.log("started pixi");
        // app = new Application();
        yield exports.app.init({ resizeTo: window });
        element.appendChild(exports.app.canvas);
        let player = new pixi_js_1.Graphics()
            .rect(0, 0, 50, 50)
            .fill("white");
        exports.app.stage.addChild(player);
        let mouse = new pixi_js_1.Graphics()
            .circle(0, 0, 10)
            .fill("red");
        exports.app.stage.addChild(mouse);
        exports.app.ticker.add((ticker) => {
            exports.elapsedTime += ticker.deltaTime;
            (0, input_1.inputUpdate)();
            if (input_1.inputs.right.isPressed) {
                player.x += 10;
            }
            if (input_1.inputs.left.isPressed) {
                player.x -= 10;
            }
            if (input_1.inputs.up.isPressed) {
                player.y -= 10;
            }
            if (input_1.inputs.down.isPressed) {
                player.y += 10;
            }
            mouse.x = input_1.mousePos.x;
            mouse.y = input_1.mousePos.y;
        });
    });
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
