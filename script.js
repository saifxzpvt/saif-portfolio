// JavaScript file for enhancing interactivity and functionality

// Function to toggle the mobile navigation menu
function toggleMenu() {
    const navMenu = document.getElementById('navMenu');
    navMenu.classList.toggle('active');
}

// Add any additional JavaScript functionality as needed
document.addEventListener("click", function (event) {
  const menu = document.getElementById("navMenu");
  const icon = document.querySelector(".menu-icon");
  if (!menu.contains(event.target) && !icon.contains(event.target)) {
    menu.classList.remove("active");
  }
});

window.addEventListener("scroll", () => {
  document.getElementById("navMenu").classList.remove("active");
});
