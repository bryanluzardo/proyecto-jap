import { CartIcon, actualizarBadge } from "../img/Cart-icon.js";

const savedPfp = localStorage.getItem("profilePicture");
if (savedPfp) {
  document.querySelectorAll(".navbar-icon").forEach((icon) => {
    icon.src = savedPfp;
  });
}

const count = JSON.parse(localStorage.getItem("cart"))?.length || ""
actualizarBadge(count)

const cart = document.querySelector(".cart-icon")
cart.innerHTML = CartIcon({count})
cart.style = 'cursor: pointer'
cart.addEventListener("click", () => window.location.href = "cart.html")

