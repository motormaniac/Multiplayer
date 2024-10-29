var frameTime:DOMHighResTimeStamp = 0;

class ComputerInput {
    static inputMap: Map<string, ComputerInput> = new Map<string, ComputerInput>();
    static initInputMap(): Map<string, ComputerInput> {
        for (let [key, value] of Object.entries(inputs)) { //iterates through the object
            ComputerInput.inputMap.set(value.code, value);
        }
        return this.inputMap;
    }

    code: string = "";
    keyDownTime: number = 0;
    keyUpTime: number = 0;
    onKeyDown:Function = () => { }
    onKeyUp:Function = () => { }

    constructor(code: string, onKeyDown:Function = () => { }, onKeyUp:Function = () => { }) {
        this.code = code;
        this.onKeyDown = onKeyDown
        this.onKeyUp = onKeyUp
        if (ComputerInput.inputMap.size === 0) {
            ComputerInput.initInputMap();
        }
    }

    keyDown(event: KeyboardEvent) {
        this.keyDownTime = performance.now()
        this.onKeyDown();
    }
    keyUp(event: KeyboardEvent) {
        this.keyUpTime = performance.now()
        this.onKeyUp();
    }
    pressedThisFrame(): boolean {
        return this.keyUpTime <= frameTime && frameTime <= this.keyDownTime
    }
    isDown():boolean {
        return this.keyDownTime <= frameTime;
    }
    isUp():boolean {
        return this.keyUpTime <= frameTime;
    }
}

export var inputs = {
    right: new ComputerInput("KeyD")
    , left: new ComputerInput("KeyA")
    , up: new ComputerInput("KeyW")
    , down: new ComputerInput("KeyS")
};

export function inputUpdate(time: DOMHighResTimeStamp) {
    frameTime = time;
}

export function keyDown(event: KeyboardEvent): void {
    // let para:HTMLParagraphElement = <HTMLParagraphElement>document.getElementById("para");
    // para.innerHTML = `Key: ${event.key} Code: ${event.code}`;
    let input = ComputerInput.inputMap.get(event.code);
    if (input) { input.keyDown(event); }
}

export function keyUp(event: KeyboardEvent): void {
    let input = ComputerInput.inputMap.get(event.code);
    if (input) { input.keyUp(event); }
}