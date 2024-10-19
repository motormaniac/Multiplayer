const canvas_element:any = document.getElementById("canvas")

function resizeCanvas():void {
    console.log("resized canvas")
    canvas_element.width = 200;
    canvas_element.height = 300;
}

window.onresize = resizeCanvas;
window.onload = resizeCanvas;
