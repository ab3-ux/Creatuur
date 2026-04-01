function openBarrel() {
  const barrel = document.getElementById("barrel");

  // effet visuel
  barrel.style.transform = "scale(1.1)";
  barrel.style.filter = "brightness(2)";

  // transformation
  setTimeout(() => {
    barrel.src = "Images/creatur001.png";
    barrel.style.transform = "scale(1)";
    barrel.style.filter = "none";
  }, 500);
}
