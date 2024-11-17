import {elapsedTime} from "./animate"

/**Time since window was loaded at the beginning of each frame (milliseconds)*/
let frameTime:number = 0;

interface TempVector2 {
    x:number;
    y:number;
}

interface inputLookupType {
    //arbitrary amount of keys whose value has type ComputerInput
    [key:string]:ComputerInput
}

/**
 * inputs.keyIdentifier.ComputerInputObjectProperties
 * Example: inputs.right.keyDown() --> true/false
*/
export let inputs:inputLookupType;
export let mousePos:TempVector2 = {x:0, y:0};
export let mouseOffset:TempVector2 = {x:0, y:0};

class BasicInput {
    /**Look up table; uses keyboard event code to find associated ComputerInput object */
    static inputMap: Map<string, BasicInput> = new Map<string, BasicInput>();
    /**Fills inputMap with BasicInput instances */
    static initInputMap(): Map<string, BasicInput> {
        for (let value of Object.values(inputs)) { //iterates through the object
            BasicInput.inputMap.set(value.code, value);
        }
        return this.inputMap;
    }
    /**Initializes the global variable 'inputs' with instances of ComputerInput*/
    static initInputs() {
        inputs = {
            right: new ComputerInput("KeyD")
            , left: new ComputerInput("KeyA")
            , up: new ComputerInput("KeyW")
            , down: new ComputerInput("KeyS")
        };
    }

    /**Corresponding keycode (event.code) */
    code: string = "";
    isPressed:boolean = false;
    /**Time when key was pressed (millis) */
    keyDownTime: number = 0;
    /**Time when key was released (millis) */
    keyUpTime: number = 0;
    /**optional callback activated whenever this key is pressed */
    onKeyDown:Function = () => { }
    /**optional callback activated whenever this key is released */
    onKeyUp:Function = () => { }

    setKeyDown(event:UIEvent) {}
    setKeyUp(event:UIEvent) {}

}

class ComputerInput extends BasicInput {

    /**
     * @param code corresponding keycode (event.code)
     * @param onKeyDown optional callback when key is pressed
     * @param onKeyUp optional callback when key is released
     */
    constructor(code: string, onKeyDown:Function = () => { }, onKeyUp:Function = () => { }) {
        super()
        this.code = code;
        this.onKeyDown = onKeyDown
        this.onKeyUp = onKeyUp
    }
    setKeyDown(event: KeyboardEvent) {
        if (this.isPressed === false) {
            this.keyDownTime = performance.now()
            this.onKeyDown();
            this.isPressed = true;
        }
    }
    setKeyUp(event: KeyboardEvent) {
        if (this.isPressed === true) {
            this.keyUpTime = performance.now()
            this.onKeyUp();
            this.isPressed = false;
        }
    }
    pressedThisFrame(): boolean {
        return this.keyUpTime <= frameTime && frameTime <= this.keyDownTime
    }
}

class MouseInput extends BasicInput {
    setKeyDown(event: MouseEvent): void {
        
    }
}

/**Called at the beginning of every frame */
export function inputUpdate() {
    frameTime = performance.now();
}

export function keyDown(event: KeyboardEvent): void {
    let input = ComputerInput.inputMap.get(event.code);
    if (input) { input.setKeyDown(event); }
}

export function keyUp(event: KeyboardEvent): void {
    let input = ComputerInput.inputMap.get(event.code);
    if (input) { input.setKeyUp(event); }
}

export function mouseMove(event:MouseEvent):void {
    mousePos.x = event.clientX;
    mousePos.y = event.clientY;
    mouseOffset.x = event.movementX
    mouseOffset.y = event.movementY
}

export function mouseDown(event:MouseEvent):void {
    console.log("mosuedown");
}
export function mouseUp(event:MouseEvent):void {
    console.log("mouseup")
}

BasicInput.initInputs();
BasicInput.initInputMap();