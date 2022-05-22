import './style.css'

const canvas = document.getElementById('screen');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;


const c = canvas.getContext('2d');
console.log(c)

class Player{
  constructor(x, y, radius, color){
    this.x = x;
    this.y = y;
    this.radius = radius;
    this.color = color;
  }
  
  draw(){
    c.beginPath();
    c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
    c.fillStyle = this.color;
    c.fill();
  }
}


class Projectile{
  constructor(x, y, radius, color, speed){
    this.x = x;
    this.y = y;
    this.radius = radius;
    this.color = color;
    this.speed = speed;
  }

  draw(){
    c.beginPath();
    c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
    c.fillStyle = this.color;
    c.fill();
  }

  update(){
    this.x = this.x + this.speed.x;
    this.y = this.y + this.speed.y;
  }
}

class Enemy{
  constructor(x, y, radius, color, speed){
    this.x = x;
    this.y = y;
    this.radius = radius;
    this.color = color;
  }
  
  draw(){
    c.beginPath();
    c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
    c.fillStyle = this.color;
    c.fill();
  }

  update(){
    this.x = this.x + this.speed.x;
    this.y = this.y + this.speed.y;
  }
}

const player = new Player((innerWidth / 2), innerHeight / 2, 50, "#C3423F");
player.draw();

window.addEventListener('resize', () => {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}, { passive: true })


const projectiles = [];
const enemies = [];

function createEnemies(){
  setTimeout(()=> {
    const enemy = new Enemy();
  }, 1000)
}

window.addEventListener('click', (e) => {
    const angle = Math.atan2(e.clientY - window.innerHeight/2, e.clientX - window.innerWidth/2);

    const speed = {
      x: Math.cos(angle) * 10,
      y: Math.sin(angle) * 10
    }

    const projectile = new Projectile(window.innerWidth / 2, window.innerHeight / 2, 10, "#9BC53D", speed);
    projectile.draw();
    projectiles.push(projectile);
}, { passive: true })


function animate(){
  requestAnimationFrame(animate);

  c.clearRect(0,0, window.innerWidth, window.innerHeight)

  player.draw();

  projectiles.forEach(projectile => {
    projectile.update();
    projectile.draw();
  })
  
}
animate();