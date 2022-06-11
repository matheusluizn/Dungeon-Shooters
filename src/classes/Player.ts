import GameObject from "./GameObject";

class Player extends GameObject {
    constructor(x: number, y: number, width: number, height: number, image: string, context: CanvasRenderingContext2D) {
        super(x, y, width, height, image, context);
    }
}

export default Player;