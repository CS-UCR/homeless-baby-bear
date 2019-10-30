const menuIcon = document.querySelector(".menu-icon");
const sidenav = document.querySelector(".sidenav");
const sidenavClose = document.querySelector(".sidenav-close-icon");

menuIcon.addEventListener("click", function() {
    sidenav.classList.toggle("active");
});

sidenavClose.addEventListener("click", function() {
    sidenav.classList.toggle("active");
});