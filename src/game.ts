import { GAME_SCREEN_SIZES } from "./constants";
import Player from "./classes/Player";
import Projectile from "./classes/Projectile";

export default class DungeonShooters{
    // GameObject properties
    canvas: HTMLCanvasElement;
    context: CanvasRenderingContext2D;
    player: Player;
    projectiles: Array<Projectile>;
    enemies: Array<Enemy>;

    constructor(canvas : HTMLCanvasElement){
        this.canvas = canvas;
        this.canvas.width = GAME_SCREEN_SIZES.width;
        this.canvas.height = GAME_SCREEN_SIZES.height;
        this.context = this.canvas.getContext("2d")!;

        this.player = new Player(GAME_SCREEN_SIZES.width / 2, GAME_SCREEN_SIZES.height / 2, 40, 65,"../assets/sprites/main-character/wizard-idle.png", this.context);
        this.projectiles = [];
        this.enemies = [];
    }

    private startEvents(){

    }

    private animate(){
        requestAnimationFrame(() => this.animate());
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);

        // draw here
        this.player.draw();
    }

    public start(){
        this.startEvents();
        this.animate();
    }

}


