const hamburger = document.querySelector(".hamburger");
const navLinks = document.querySelector(".nav-Links");
const links = document.querySelectorAll(".nav-Links li");
const hide = document.querySelector(".hidetext");

hamburger.addEventListener("click", () => {
  navLinks.classList.toggle("open");
  hide.classList.toggle("hide");
});
