import './style.css'

const canvas = document.getElementById('screen');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const colors = { "Cyan Process": "#5bc0eb", "Minion Yellow": "#fde74c", "Android Green": "#9bc53d", "Madder Lake": "#c3423f", "Raisin Black": "#211a1e" }

const c = canvas.getContext('2d');
console.log("Canvas context:", c)

import img from "../player.png"

let points = 0;

const image  = new Image(60, 45)
image.src = img

class Player {
  constructor(x, y, radius, color) {
    this.x = x;
    this.y = y;
    this.radius = radius;
    this.color = color;
  }

  draw() {
    //c.beginPath();
    //c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
    //c.fillStyle = this.color;
    //c.fill();
    c.drawImage(image, this.x, this.y, 48, 64)
  }
}


class Projectile {
  constructor(x, y, radius, color, speed) {
    this.x = x;
    this.y = y;
    this.radius = radius;
    this.color = color;
    this.speed = speed;
  }

  draw() {
    c.beginPath();
    c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
    c.fillStyle = this.color;
    c.fill();
  }

  update() {
    this.x = this.x + this.speed.x;
    this.y = this.y + this.speed.y;
  }
}

class Enemy {
  constructor(x, y, radius, color, speed) {
    this.x = x;
    this.y = y;
    this.radius = radius;
    this.color = color;
    this.speed = speed;
  }

  draw() {
    c.beginPath();
    c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
    c.fillStyle = this.color;
    c.fill();
  }

  update() {
    this.x = this.x + this.speed.x;
    this.y = this.y + this.speed.y;
  }
}

const player = new Player((innerWidth / 2), innerHeight / 2, 48, "#C3423F");
player.draw();

window.addEventListener('resize', () => {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}, { passive: true })


const projectiles = [];
const enemies = [];

function createEnemies() {
  setInterval(() => {

    const y = Math.random() * window.innerHeight;
    const x = Math.random() * window.innerWidth; 

    const angle = Math.atan2(window.innerHeight / 2 - y, window.innerWidth / 2 - x);

    const speed = {
      x: Math.cos(angle),
      y: Math.sin(angle)
    }

    const enemy = new Enemy(x, y, 50, colors['Cyan Process'], speed);
    enemies.push(enemy);

  }, 2000)
}
createEnemies();

window.addEventListener('click', (e) => {
  const angle = Math.atan2(e.clientY - window.innerHeight / 2, e.clientX - window.innerWidth / 2);

  const speed = {
    x: Math.cos(angle) * 10,
    y: Math.sin(angle) * 10
  }

  const projectile = new Projectile(window.innerWidth / 2, window.innerHeight / 2, 10, "#9BC53D", speed);
  projectile.draw();
  projectiles.push(projectile);
}, { passive: true })


function animate() {
  let animationId = requestAnimationFrame(animate);

  c.clearRect(0, 0, window.innerWidth, window.innerHeight)

  player.draw();

  projectiles.forEach(projectile => {
    projectile.update();
    projectile.draw();
  })

  enemies.forEach((enemy, enemyI) => {
    enemy.update()
    enemy.draw();

    let distance = Math.hypot(player.x - enemy.x, player.y - enemy.y)

    if(distance - enemy.radius - player.radius < 1) {
      console.log("Collision player");
      cancelAnimationFrame(animationId);
    }

    projectiles.forEach((projectile, projectileI) => {
      let distance = Math.hypot(projectile.x - enemy.x, projectile.y - enemy.y)
      //console.log(distance)

      if (distance - enemy.radius - projectile.radius < 1){
        setTimeout(() => {
          console.log("Collision", enemyI)
          enemies.splice(enemyI, 1)
          projectiles.splice(projectileI, 1)
        }, 0);
      }
    })
  })   

}
animate();