
function openBarrel() {
  const barrel = document.getElementById("barrel");

  // 🫨 effet tremblement
  barrel.style.transform = "scale(1.1)";
  
  // 💥 simulation explosion
  setTimeout(() => {
    barrel.src = "images/creatur001.png";
  }, 1000);
}
