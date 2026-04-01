function openBarrel() {
  const barrel = document.getElementById("barrel");

  // effet visuel
  barrel.style.border = "5px solid red";
  barrel.style.transform = "scale(1.1)";
  barrel.style.filter = "brightness(1.5)";

  // retour normal
  setTimeout(() => {
    barrel.style.border = "none";
    barrel.style.transform = "scale(1)";
    barrel.style.filter = "none";
  }, 300);
}
