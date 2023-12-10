const p = document.querySelector("p")
const canvas = document.querySelector("canvas")
const ctx = canvas.getContext("2d")

const width = canvas.width = window.innerWidth
const height = canvas.height = window.innerHeight

let bolas = []

class Ball {
    x;
    y;
    velX;
    velY;
    color;
    size;
    exists;
    constructor(x, y, velX, velY, color, size, exists) {
        this.x = x
        this.y = y
        this.velX = velX
        this.velY = velY
        this.color = color
        this.size = size
        this.exists = exists
    }

    desenhar() {
        ctx.beginPath()
        ctx.fillStyle = this.color
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2)
        ctx.fill()
    }
    
    update() {
        if (this.x + this.size >= width) {
            this.velX = -this.velX
        }
        if (this.x - this.size <= 0) {
            this.velX = -this.velX
        }
        if (this.y + this.size >= height) {
            this.velY = -this.velY
        }
        if (this.y - this.size <= 0) {
            this.velY = -this.velY
        }
    
        this.x += this.velX
        this.y += this.velY
    }

    colidem() {
        for (let j = 0; j < bolas.length; j++) {
            if (this !== bolas[j]) {
                const dx = this.x - bolas[j].x
                const dy = this.y - bolas[j].y
                const distance = Math.sqrt(dx * dx + dy * dy)

                if (distance < this.size + bolas[j].size) {
                    bolas[j].velX = -bolas[j].velX
                    bolas[j].velY = -bolas[j].velY
                    this.velX = -this.velX
                    this.velY = -this.velY
                    this.color = bolas[j].color
                }
            }
        }
    }
}

for (let i = 0; i < 25; i++) {
    let size = random(10, 20)
    let bola = new Ball(random(0 + size, width - size),
        random(0 + size, height - size), 
        random(-7, 7), 
        random(-7, 7), 
        randomColor(), 
        size, 
        true)
    bolas.push(bola)
}


function loop() {
    ctx.fillStyle = "rgba(0, 0, 0, 0.25)"
    ctx.fillRect(0, 0, width, height)
    
    for (let i = 0; i < bolas.length; i++) {
        bolas[i].desenhar()
        bolas[i].update()
        bolas[i].colidem()
    }

    requestAnimationFrame(loop)
}

loop()

function random(min, max) {
    let num = Math.floor(Math.random() * (max - min +1)) + min
    return num
}

function randomColor() {
    return `rgb(${random(0, 255)}, ${random(0, 255)}, ${random(0, 255)})`
}