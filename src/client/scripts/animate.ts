let animationId = 0; //the current id of the animation frame (requestAnimationFrame returns its id)

export function startAnimation():void {
    animationId = requestAnimationFrame(update);
}

export function stopAnimation():void {
    cancelAnimationFrame(animationId);
}

function update():void {
    animationId = requestAnimationFrame(update)
}