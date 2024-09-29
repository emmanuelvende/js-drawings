import { Ball } from "./ball.js";
import { randomFromInterval, generateRandomColor } from "./randomize.js";

const p = document.getElementById('info');

const drawingZone = document.getElementById('drawingZone');
const [W, H] = [400, 300];
drawingZone.width = W;
drawingZone.height = H;
const ctx = drawingZone.getContext("2d");

function generateBalls(n, w, h) {
    const minRadius = 3;
    const maxRadius = 8;
    let balls = [];
    for (let i = 0; i < n; i++) {
        const radius = Math.random() * (maxRadius - minRadius + 1) + minRadius;
        const x = randomFromInterval(radius, w);
        const y = randomFromInterval(radius, h);
        balls.push(new Ball(x, y, radius, generateRandomColor()));
    }
    return balls;
}

let prev_timestamp;
const balls = generateBalls(100, W, H);

function draw(timestamp) {

    if (prev_timestamp == undefined) {
        prev_timestamp = timestamp;
    }
    const elapsed = timestamp - prev_timestamp;
    if (elapsed !== 0) {
        const freq = 1000 / elapsed;
        p.textContent = `${Math.round(freq)} fps`;
    }
    prev_timestamp = timestamp;

    ctx.fillStyle = "rgb(0 0 0)";
    ctx.fillRect(0, 0, W, H);

    for (const b of balls) {

        b.draw(ctx);
        b.move(elapsed / 5, W, H, balls);
    }

    window.requestAnimationFrame(draw);
}

draw();