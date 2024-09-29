export class Ball {
    constructor(x, y, radius = 5, color = "#c0ff20") {
        this.x = x;
        this.y = y;
        this.radius = radius;
        this.color = color;
        this.xSpeed = 0.25;
        this.ySpeed = 0.125;
    }

    move(dt, w, h, balls) {
        if (!isNaN(dt)) {
            this.x += this.xSpeed * dt;
            this.y += this.ySpeed * dt;
            this.manageBoundaryCollisions(w, h);
            this.manageElasticShocks(balls);
            this.unstuck(balls);
        }
    }

    unstuck(balls) {
        for (const ball of balls) {
            if (this !== ball) {
                const d = computeDistance(this, ball);
                const minD = this.radius + ball.radius;
                const e = minD - d;
                if (e > 0) {
                    if (this.x < ball.x) {
                        this.x -= e / 1.414;
                        ball.x += e / 1.414
                    } else {
                        ball.x -= e / 1.414;
                        this.x += e / 1.414
                    }

                    if (this.y < ball.y) {
                        this.y -= e / 1.414;
                        ball.y += e / 1.414
                    } else {
                        ball.y -= e / 1.414;
                        this.y += e / 1.414
                    }
                }
            }
        }
    }


    manageBoundaryCollisions(w, h) {
        if (this.x - this.radius < 0) {
            this.x = this.radius;
            this.xSpeed = Math.abs(this.xSpeed);
        }
        if (this.x + this.radius > w) {
            this.x = w - this.radius;
            this.xSpeed = - Math.abs(this.xSpeed);
        }
        if (this.y - this.radius < 0) {
            this.y = this.radius;
            this.ySpeed = Math.abs(this.ySpeed);
        }
        if (this.y + this.radius > h) {
            this.y = h - this.radius;
            this.ySpeed = - Math.abs(this.ySpeed);
        }
    }

    manageElasticShocks(balls) {
        for (const ball of balls) {
            if (this !== ball) {
                const distance = computeDistance(this, ball);
                if (distance <= this.radius + ball.radius) {
                    this.doElasticShock();
                    ball.doElasticShock();
                }
            }
        }
    }

    doElasticShock() {
        this.xSpeed = - this.xSpeed;
        this.ySpeed = - this.ySpeed;
    }

    draw(ctx) {
        ctx.fillStyle = this.color;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, degToRad(360), true);
        ctx.fill();
    }

}

function computeDistance(a, b) {
    const dx = a.x - b.x;
    const dy = a.y - b.y;
    return Math.sqrt(dx ** 2 + dy ** 2);
}

function degToRad(degrees) {
    return (degrees * Math.PI) / 180;
}