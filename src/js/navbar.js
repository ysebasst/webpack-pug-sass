const navToggleButton = document.querySelector(".nav__toggle");
const navMenu = document.querySelector(".nav__menu");

navToggleButton.addEventListener("click", (e) => {
  navMenu.classList.toggle("nav__menu--show");
});
