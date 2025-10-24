const canvas = document.getElementById('bubbleCanvas');
const ctx = canvas.getContext('2d');

const bubbles = [];
let lastTimestamp = performance.now();

function resizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}

function randomColorComponents() {
  const hue = Math.random() * 360;
  const saturation = 60 + Math.random() * 35; // pastel/neon range
  const lightness = 55 + Math.random() * 20;
  return { hue, saturation, lightness };
}

function spawnBubble(x, y, { burst = false } = {}) {
  const baseRadius = 10 + Math.random() * 26;
  const duration = 1000 + Math.random() * 1000;
  const { hue, saturation, lightness } = randomColorComponents();
  const speedBoost = burst ? 1.4 : 1;

  bubbles.push({
    x,
    y,
    baseRadius,
    radius: baseRadius,
    duration,
    life: duration,
    hue,
    saturation,
    lightness,
    alpha: 0.85,
    velocityX: (Math.random() - 0.5) * (burst ? 120 : 50),
    velocityY: -((20 + Math.random() * 30) * speedBoost),
    shrinkFactor: 0.5 + Math.random() * 0.4,
  });
}

function update(delta) {
  for (let i = bubbles.length - 1; i >= 0; i -= 1) {
    const bubble = bubbles[i];
    bubble.life -= delta;

    if (bubble.life <= 0) {
      bubbles.splice(i, 1);
      continue;
    }

    const lifeProgress = bubble.life / bubble.duration;
    bubble.radius = bubble.baseRadius * (lifeProgress * bubble.shrinkFactor + 0.35);
    bubble.alpha = lifeProgress;
    bubble.x += bubble.velocityX * (delta / 1000);
    bubble.y += bubble.velocityY * (delta / 1000);
    bubble.velocityX *= 0.98; // gentle slowing of lateral drift
    bubble.velocityY -= 4 * (delta / 1000); // encourage upward float
  }
}

function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  bubbles.forEach((bubble) => {
    ctx.beginPath();
    ctx.fillStyle = `hsla(${bubble.hue}, ${bubble.saturation}%, ${bubble.lightness}%, ${bubble.alpha})`;
    ctx.arc(bubble.x, bubble.y, Math.max(bubble.radius, 0), 0, Math.PI * 2);
    ctx.fill();
  });
}

function animate(timestamp) {
  const delta = timestamp - lastTimestamp;
  lastTimestamp = timestamp;
  update(delta);
  draw();
  requestAnimationFrame(animate);
}

function handlePointerMove(event) {
  const rect = canvas.getBoundingClientRect();
  const x = event.clientX - rect.left;
  const y = event.clientY - rect.top;
  spawnBubble(x, y);
}

function handlePointerDown(event) {
  const rect = canvas.getBoundingClientRect();
  const x = event.clientX - rect.left;
  const y = event.clientY - rect.top;

  const burstCount = 12 + Math.floor(Math.random() * 6);
  for (let i = 0; i < burstCount; i += 1) {
    spawnBubble(x, y, { burst: true });
  }
}

resizeCanvas();
window.addEventListener('resize', resizeCanvas);
document.addEventListener('pointermove', handlePointerMove);
document.addEventListener('pointerdown', handlePointerDown);
requestAnimationFrame(animate);
