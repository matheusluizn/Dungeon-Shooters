import GameObject from "./GameObject";

class Player extends GameObject {
    speed: number;
    constructor(x: number, y: number, width: number, height: number, image: string, context: CanvasRenderingContext2D, speed: number) {
        super(x, y, width, height, image, context);
        this.speed = speed;
    }

    update(keysDown: any, modifier: number) {
        if (keysDown.ArrowLeft) {
            this.x -= this.speed * modifier;
        }
        if (keysDown.ArrowRight) {
            this.x += this.speed * modifier;
        }
        if (keysDown.ArrowUp) {
            this.y -= this.speed * modifier;
        }
        if (keysDown.ArrowDown) {
            this.y += this.speed * modifier;
        }
    }

}

export default Player;