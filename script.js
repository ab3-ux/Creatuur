const canvas = document.getElementById("stars");
const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let stars = [];

/* CREATION DES ETOILES */
for (let i = 0; i < 150; i++) {
  stars.push({
    x: Math.random() * canvas.width,
    y: Math.random() * canvas.height,
    radius: Math.random() * 2,
    speed: Math.random() * 0.5
  });
}

/* ANIMATION */
function animateStars() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  for (let star of stars) {
    ctx.beginPath();
    ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2);
    ctx.fillStyle = "white";
    ctx.fill();

    star.y += star.speed;

    if (star.y > canvas.height) {
      star.y = 0;
      star.x = Math.random() * canvas.width;
    }
  }

  requestAnimationFrame(animateStars);
}

animateStars();

/* RESIZE */
window.addEventListener("resize", () => {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
});

/* TON BOUTON */
function openBarrel() {
  let img = document.getElementById("barrel");

  img.style.transform = "scale(1.2)";
  img.style.filter = "drop-shadow(0 0 40px violet)";

  setTimeout(() => {
    img.style.transform = "scale(1)";
    img.style.filter = "drop-shadow(0 0 25px cyan)";
  }, 300);
}
