let animationId = 0; //the current id of the animation frame (requestAnimationFrame returns its id)

let context:CanvasRenderingContext2D;

export function startAnimation(ctx:CanvasRenderingContext2D):void {
    context = ctx;
    animationId = requestAnimationFrame(update);
}

export function stopAnimation():void {
    cancelAnimationFrame(animationId);
}

function update():void {
    animationId = requestAnimationFrame(update);
    context.fillStyle = "#ffffff";
    context.fillRect(100,100,50,50);
}