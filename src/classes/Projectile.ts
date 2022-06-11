import GameObject from "./GameObject";

interface IShowSpeed{
    x: number;
    y: number;
}

class Projectile extends GameObject {
    speed: IShowSpeed;
    constructor(x: number, y: number, width: number, height: number, image: string, context: CanvasRenderingContext2D, speed: IShowSpeed) {
        super(x, y, width, height, image, context);
        this.speed = speed;
    }

    public update() {
        this.x +=  this.speed.x;
        this.y +=  this.speed.y;
    }
}

export default Projectile;