// Create canvas element
const canvas = document.getElementById("canvas");
canvas.width = 960;
canvas.height = 120;
canvas.style.backgroundColor = "black";
document.body.appendChild(canvas);

// Get canvas context
const ctx = canvas.getContext("2d");

// List to store active ripples
const ripples = [];

// Event listener for mouse click
canvas.addEventListener("click", createRipple);

function createRipple(event) {
  // Get click position
  const x = event.clientX - canvas.offsetLeft;
  const y = event.clientY - canvas.offsetTop;

  // Generate random color
  const color = getRandomColor();

  // Start ripple animation
  animateRipple(x, y, color);
}

function animateRipple(x, y, color) {
  const duration = 1000; // Animation duration in milliseconds
  const startRadius = 10;
  const endRadius = 100;
  const startLineWidth = 10;
  const endLineWidth = 1;
  const startTime = performance.now();

  function drawFrame() {
    // ctx.clearRect(0, 0, canvas.width, canvas.height);

    const elapsed = performance.now() - startTime;
    const progress = elapsed / duration;
    const currentRadius = startRadius + progress * (endRadius - startRadius);
    const currentLineWidth =
      startLineWidth + progress * (endLineWidth - startLineWidth);

    ctx.beginPath();
    ctx.arc(x, y, currentRadius, 0, Math.PI * 2);
    ctx.lineWidth = currentLineWidth;
    ctx.strokeStyle = color;
    ctx.stroke();

    if (progress < 1) {
      requestAnimationFrame(drawFrame);
    } else {
      // Remove completed ripple from the list
      const index = ripples.indexOf(drawFrame);
      if (index > -1) {
        ripples.splice(index, 1);
      }
    }
  }

  const rippleAnimation = drawFrame;
  ripples.push(rippleAnimation);
  requestAnimationFrame(rippleAnimation);
}

function drawRipples() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  for (let i = 0; i < ripples.length; i++) {
    ripples[i]();
  }
  requestAnimationFrame(drawRipples);
}

requestAnimationFrame(drawRipples);

function getRandomColor() {
  const letters = "0123456789ABCDEF";
  let color = "#";
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}
