import { CartIcon, actualizarBadge } from "../img/Cart-icon.js";

export function initNavbarIcon() {
  const savedPfp = localStorage.getItem("profilePicture");
  if (savedPfp) {
    document.querySelectorAll(".navbar-icon").forEach((icon) => {
      icon.src = savedPfp;
    });
  }

  const count = JSON.parse(localStorage.getItem("cart"))?.length || "";
  actualizarBadge(count);

  const cart = document.querySelector(".cart-icon");
  if (!cart) return; // evita el error si el nav aún no existe

  cart.innerHTML = CartIcon({ count });
  cart.style.cursor = "pointer";
  cart.addEventListener("click", () => window.location.href = "#/cart");
  

}
