/**Time since window was loaded at the beginning of each frame (milliseconds)*/
var frameTime:DOMHighResTimeStamp = 0;

interface inputLookupType {
    //arbitrary amount of keys whose value has type ComputerInput
    [key:string]:ComputerInput
}

/**
 * inputs.keyIdentifier.ComputerInputObjectProperties
 * Example: inputs.right.keyDown() --> true/false
*/
export var inputs:inputLookupType;

class ComputerInput {
    /**Look up table; uses keyboard event code to find associated ComputerInput object */
    static inputMap: Map<string, ComputerInput> = new Map<string, ComputerInput>();
    /**Fills inputMap with ComputerInput instances */
    static initInputMap(): Map<string, ComputerInput> {
        for (let value of Object.values(inputs)) { //iterates through the object
            ComputerInput.inputMap.set(value.keyCode, value);
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
    keyCode: string = "";
    isPressed:boolean = false;
    /**Time when key was pressed (millis) */
    keyDownTime: number = 0;
    /**Time when key was released (millis) */
    keyUpTime: number = 0;
    /**optional callback activated whenever this key is pressed */
    onKeyDown:Function = () => { }
    /**optional callback activated whenever this key is released */
    onKeyUp:Function = () => { }

    /**
     * @param code corresponding keycode (event.code)
     * @param onKeyDown optional callback when key is pressed
     * @param onKeyUp optional callback when key is released
     */
    constructor(code: string, onKeyDown:Function = () => { }, onKeyUp:Function = () => { }) {
        this.keyCode = code;
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


/**Called at the beginning of every frame */
export function inputUpdate(time: DOMHighResTimeStamp) {
    frameTime = time;
}

export function keyDown(event: KeyboardEvent): void {
    console.log(event.code);
    let input = ComputerInput.inputMap.get(event.code);
    if (input) { input.setKeyDown(event); }
}

export function keyUp(event: KeyboardEvent): void {
    console.log(event.code);
    let input = ComputerInput.inputMap.get(event.code);
    if (input) { input.setKeyUp(event); }
}

ComputerInput.initInputs();
ComputerInput.initInputMap();