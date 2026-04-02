function openBarrel() {
  let img = document.getElementById("barrel");

  img.style.transform = "scale(1.2) rotate(3deg)";
  img.style.filter = "drop-shadow(0 0 40px red)";

  setTimeout(() => {
    img.style.transform = "scale(1) rotate(0deg)";
    img.style.filter = "drop-shadow(0 0 25px cyan)";
  }, 300);
}
