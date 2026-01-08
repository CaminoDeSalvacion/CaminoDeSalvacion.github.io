// seasonal/christmas/christmas.js

/* ---------- Snowfall ---------- */
const canvas = document.getElementById("snow-canvas");
if (canvas) {
  const ctx = canvas.getContext("2d");
  const resize = () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  };
  resize();

  const snowflakes = Array.from({ length: 120 }, () => ({
    x: Math.random() * canvas.width,
    y: Math.random() * canvas.height,
    r: Math.random() * 4 + 1,
    d: Math.random() * 1,
  }));

  function drawSnow() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = "white";
    ctx.beginPath();

    snowflakes.forEach((f) => {
      ctx.moveTo(f.x, f.y);
      ctx.arc(f.x, f.y, f.r, 0, Math.PI * 2);
    });

    ctx.fill();

    snowflakes.forEach((f) => {
      f.y += Math.pow(f.d, 2) + 1;
      if (f.y > canvas.height) {
        f.y = -10;
        f.x = Math.random() * canvas.width;
      }
    });
  }

  setInterval(drawSnow, 30);

  window.addEventListener("resize", resize);
}

/* ---------- Christmas Lights on Letters ---------- */
document.addEventListener("DOMContentLoaded", () => {
  const elements = document.querySelectorAll(".light-letters");
  const colors = ["#ff5252", "#ffca28", "#66bb6a", "#42a5f5"];

  elements.forEach((el) => {
    const text = el.textContent;
    el.textContent = "";

    [...text].forEach((ch, i) => {
      if (ch === " ") {
        el.appendChild(document.createTextNode(" "));
        return;
      }

      const span = document.createElement("span");
      span.textContent = ch;
      span.className = "light-letter";
      span.style.setProperty("--bulb-color", colors[i % colors.length]);
      span.style.setProperty("--index", i);
      el.appendChild(span);
    });
  });
});
