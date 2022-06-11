import { GAME_SCREEN_SIZES } from "./constants";
import Player from "./classes/Player";
import Projectile from "./classes/Projectile";
import Enemy from "./classes/Enemy";

export default class DungeonShooters {

  canvas: HTMLCanvasElement;
  context: CanvasRenderingContext2D;
  player: Player;
  projectiles: Array<Projectile>;
  enemies: Array<Enemy>;

  constructor(canvas: HTMLCanvasElement) {
    this.canvas = canvas;
    this.canvas.width = GAME_SCREEN_SIZES.width;
    this.canvas.height = GAME_SCREEN_SIZES.height;
    this.context = this.canvas.getContext("2d")!;

    this.player = new Player(GAME_SCREEN_SIZES.width / 2, GAME_SCREEN_SIZES.height / 2, 30, 55, "../assets/sprites/main-character/wizard-idle.png", this.context);
    this.projectiles = [];
    this.enemies = [];
  }

  private startEvents() {
    window.addEventListener("click", (e) => {
      const angle = Math.atan2(e.clientY - window.innerHeight / 2, e.clientX - window.innerWidth / 2);
      const speed = {
        x: Math.cos(angle) * 10,
        y: Math.sin(angle) * 10,
      }

      const projectile = new Projectile(this.player.x, this.player.y, 20, 20, "../assets/sprites/projectile/mage_projectile.png", this.context, speed);
      this.projectiles.push(projectile);
    });

    window.addEventListener("keydown", (event) => {
        switch(event.key){
            case "a":
            case "ArrowLeft":
                console.log("left");
                break;
            case "s":
            case "ArrowDown":
                console.log("down");
                break;
        }
    })
  }

  private animate() {
    requestAnimationFrame(() => this.animate());
    this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);

    this.player.draw();
    this.projectiles.forEach((projectile) => {
      projectile.update();
      projectile.draw();
    });
  }

  public start() {
    this.startEvents();
    this.animate();
  }

}


