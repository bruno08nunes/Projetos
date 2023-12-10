const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');

const width = canvas.width = window.innerWidth;
const height = canvas.height = window.innerHeight;

const p = document.querySelector("p")

// function to generate random number

function random(min, max) {
  const num = Math.floor(Math.random() * (max - min + 1)) + min;
  return num;
}

function Shape(x,  y, velX, velY, exists) {
	this.x = x
	this.y = y
	this.velX = velX
	this.velY = velY
  this.exists = exists
}

function Ball(x, y, velX, velY, exists, color, size) {
  Shape.call(this, x, y, velX, velY, exists)
  this.color = color
  this.size = size
}

function evilCircle(x, y, exists) {
  Shape.call(this, x, y, 20, 20, exists)
  this.color = "white"
  this.size = 10
}

Ball.prototype.draw = function () {
    ctx.beginPath()
    ctx.fillStyle = this.color
    ctx.arc(this.x, this.y, this.size, 0, 2 * Math.PI)
    ctx.fill()
}

Ball.prototype.update = function () {
    if (this.x + this.size >= width) {
      this.velX = -this.velX;
    }
  
    if (this.x - this.size <= 0) {
      this.velX = -this.velX;
    }
  
    if (this.y + this.size >= height) {
      this.velY = -this.velY;
    }
  
    if (this.y - this.size <= 0) {
      this.velY = -this.velY;
    }
  
    this.x += this.velX;
    this.y += this.velY;
};

Ball.prototype.collisionDetect = function () {
    for (let j = 0; j < balls.length; j++) {
      if (!(this === balls[j])) {
        const dx = this.x - balls[j].x;
        const dy = this.y - balls[j].y;
        const distance = Math.sqrt(dx * dx + dy * dy);
  
        if (distance < this.size + balls[j].size) {
          balls[j].color = this.color =
            "rgb(" +
            random(0, 255) +
            "," +
            random(0, 255) +
            "," +
            random(0, 255) +
            ")";
        }
      }
    }
};

evilCircle.prototype.draw = function () {
  ctx.beginPath()
  ctx.strokeStyle = this.color
  ctx.arc(this.x, this.y, this.size, 0, 2 * Math.PI)
  ctx.lineWidth = 3
  ctx.stroke()
}

evilCircle.prototype.update = function () {
  if (this.x + this.size >= width) {
    this.x -= this.size
  }

  if (this.x - this.size <= 0) {
    this.x += this.size
  }

  if (this.y + this.size >= height) {
    this.y -= this.size
  }

  if (this.y - this.size <= 0) {
    this.y += this.size
  }
};

evilCircle.prototype.setControls = function () {
  var _this = this;
  window.onkeydown = function (e) {
    if (e.keyCode === 65) {
      _this.x -= _this.velX;
    } else if (e.keyCode === 68) {
      _this.x += _this.velX;
    } else if (e.keyCode === 87) {
      _this.y -= _this.velY;
    } else if (e.keyCode === 83) {
      _this.y += _this.velY;
    }
  };
}

evilCircle.prototype.collisionDetect = function () {
  for (let j = 0; j < balls.length; j++) {
    if (balls[j].exists) {
      const dx = this.x - balls[j].x;
      const dy = this.y - balls[j].y;
      const distance = Math.sqrt(dx * dx + dy * dy);

      if (distance < this.size + balls[j].size) {
        balls[j].exists = false
        ballsExists -= 1
        p.textContent = `Contagem de bolas: ${ballsExists}`
      }
    }
  }
};

let balls = [];
while (balls.length < 25) {
  let size = random(10, 20);
  let ball = new Ball(
    random(0 + size, width - size),
    random(0 + size, height - size),
    random(-7, 7),
    random(-7, 7),
    true,
    "rgb(" +
    random(0, 255) +
    "," +
    random(0, 255) +
    "," +
    random(0, 255) +
    ")",
    size
    );
    
    balls.push(ball);
  }
let ballsExists = balls.length
p.textContent = "Contagem de bolas: " + ballsExists

EvilCircle = new evilCircle(random(0 + 20, width - 20), random(0 + 20, height - 20), true)
EvilCircle.setControls()

function loop() {
    ctx.fillStyle = "rgba(0, 0, 0, 0.25)";
    ctx.fillRect(0, 0, width, height);
  
    for (let i = 0; i < balls.length; i++) {
      if (balls[i].exists) {
        balls[i].draw();
        balls[i].update();
        balls[i].collisionDetect()
      }
    }
    EvilCircle.draw()
    EvilCircle.update()
    EvilCircle.collisionDetect()
    if (ballsExists == 0) {
      alert("Você ganhou!")
    }
    
    requestAnimationFrame(loop);
}

loop()
  

// function to generate random color

function randomRGB() {
  return `rgb(${random(0, 255)},${random(0, 255)},${random(0, 255)})`;
}