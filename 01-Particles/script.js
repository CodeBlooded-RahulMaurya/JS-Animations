const canvas = document.getElementById("canvas1");
const ctx = canvas.getContext("2d");
canvas.height = window.innerHeight;
canvas.width = window.innerWidth;

const particles = [];

const mouse = {
  x: undefined,
  y: undefined,
};

window.addEventListener("resize", () => {
  canvas.height = window.innerHeight;
  canvas.width = window.innerWidth;
});

window.addEventListener("mousemove", (e) => {
  mouse.x = e.x;
  mouse.y = e.y;
});

window.addEventListener('click', ()=>{
    particles.push(new Particle(mouse.x, mouse.y, Math.random()*7 + 3, Math.random() * 4, Math.random()*4, 'red'));
})

class Particle {
  constructor(x, y, size, xSpeed, ySpeed, color) {
    this.x = x;
    this.y = y;
    this.size = size;
    this.color = color;
    this.xSpeed = xSpeed;
    this.ySpeed = ySpeed;
  }

  draw() {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
    ctx.fillStyle = this.color;
    ctx.fill();
  }

  update() {
    if (this.x + this.xSpeed < canvas.width && this.x + this.xSpeed > 0) {
      this.x += this.xSpeed;
    } else {
      this.xSpeed = -this.xSpeed;
    }
    if (this.y + this.ySpeed < canvas.height && this.y + this.ySpeed > 0) {
      this.y += this.ySpeed;
    } else {
      this.ySpeed = -this.ySpeed;
    }
  }
}

function init() {
  for (let i = 0; i < 100; i++) {
    let posX = Math.random() * canvas.width;
    let posY = Math.random() * canvas.height;
    let size = Math.random() * 7 + 2;
    let color = "red";
    let xSpeed = Math.random() * 1 - 0.5;
    let ySpeed = Math.random() * 1 - 0.5;
    particles.push(new Particle(posX, posY, size, xSpeed, ySpeed, color));
  }
}

function handleParticle() {
  for (let i = 0; i < particles.length; i++) {
    const part = particles[i];
    part.draw();
    part.update();
    for (let j = 0; j < particles.length; j++) {
      const dx = (particles[i].x - particles[j].x);
      const dy = (particles[i].y - particles[j].y);
      const distance = Math.sqrt(dx * dx + dy * dy);
      if (distance < 100) {
        ctx.beginPath();
        ctx.strokeStyle = 'white';
        ctx.lineWidth = 0.2;
        ctx.moveTo(particles[i].x, particles[i].y);
        ctx.lineTo(particles[j].x, particles[j].y);
        ctx.stroke();
        ctx.closePath();
      }
    }
  }
}

function animate() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  // ctx.fillStyle="rgba(0,0,0,0.02)";
  // ctx.fillRect(0,0,canvas.width,canvas.height);

  handleParticle();
  requestAnimationFrame(animate);
}
init();

animate();
