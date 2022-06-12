import { GAME_SCREEN_SIZES } from "./constants";
import Player from "./classes/Player";
import Projectile from "./classes/Projectile";
import Enemy from "./classes/Enemy";
import SPRITES from "./sprites";

export default class DungeonShooters {

  canvas: HTMLCanvasElement;
  context: CanvasRenderingContext2D;
  player: Player;
  projectiles: Array<Projectile>;
  enemies: Array<Enemy>;
  lastUpdate: number = Date.now();
  keysPressed : any;

  constructor(canvas: HTMLCanvasElement) {
    this.canvas = canvas;
    this.canvas.width = GAME_SCREEN_SIZES.width;
    this.canvas.height = GAME_SCREEN_SIZES.height;
    this.context = this.canvas.getContext("2d")!;

    this.player = new Player(GAME_SCREEN_SIZES.width / 2, GAME_SCREEN_SIZES.height / 2, 30, 55, SPRITES.mage.sprite, this.context, 0.2);
    this.keysPressed = {};

    this.projectiles = [];
    this.enemies = [];

  }

  private startEvents() {
    addEventListener("click", (e) => {
      const angle = Math.atan2(e.clientY - window.innerHeight / 2, e.clientX - window.innerWidth / 2);
      const speed = {
        x: Math.cos(angle) * 8,
        y: Math.sin(angle) * 8,
      }

      const projectile = new Projectile(this.player.x, this.player.y, 20, 20, SPRITES.mage.projectile, this.context, speed);
      this.projectiles.push(projectile);
    });

    addEventListener("keydown", (e)=> {
      this.keysPressed[e.key] = true;
    }, false);
    
    addEventListener("keyup", (e)=> {
      delete this.keysPressed[e.key];
    }, false);
  }

  private createEnemies() {
    setInterval(() => {

      const y = Math.random() * GAME_SCREEN_SIZES.height;
      const x = Math.random() * GAME_SCREEN_SIZES.width;

      const angle = Math.atan2(this.player.y - y, this.player.x - x);

      const speed = {
        x: Math.cos(angle),
        y: Math.sin(angle),
      }

      const randomEnemySprite = Object.values(SPRITES.enemies)[Math.floor(Math.random() * Object.values(SPRITES.enemies).length)];

      const enemy = new Enemy(x, y, 40, 40, randomEnemySprite, this.context, speed);
      this.enemies.push(enemy);
      
    }, 100000);
  }
  
  private animate() {
    let animationId = requestAnimationFrame(() => this.animate());
    let now = Date.now();
    let delta = now - this.lastUpdate;

    this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.player.draw();
    this.player.update(this.keysPressed, delta);
    this.projectiles.forEach((projectile) => {
      projectile.update();
      projectile.draw();
    });
    this.enemies.forEach((enemy) => {
      
      enemy.update();
      enemy.draw();

      let distance = Math.hypot(this.player.x - enemy.x, this.player.y - enemy.y);
      let colision = distance - enemy.width + 12 - this.player.width + 12;

      console.log(colision)

      if(colision < 1){
        console.log("enemy player colision")
        cancelAnimationFrame(animationId);
      }
    })

    this.lastUpdate = now;
  }

  public start() {
    this.startEvents();
    this.animate();
    this.createEnemies();
  }

}


