function openBarrel() {
  const barrel = document.getElementById("barrel");

  // effet ouverture
  barrel.style.transform = "scale(1.2)";
  barrel.style.filter = "brightness(2)";

  // éclosion
  setTimeout(() => {
    barrel.src = "creature.png";
    barrel.style.transform = "scale(1)";
    barrel.style.filter = "none";
  }, 500);
}
