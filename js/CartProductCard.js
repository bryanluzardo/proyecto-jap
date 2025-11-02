import { actualizarBadge } from "../img/Cart-icon.js";

const container = document.querySelector(".cart-container");

let cart = JSON.parse(localStorage.getItem("cart")) || [];

const CartProductCard = ({ product }) => {
  const costUSD = product.currency === "UYU" ? product.cost / 40 : product.cost;

  const card = document.createElement("div");
  card.classList.add("cart-product-card");

  const img = document.createElement("img");
  img.src = product.images;
  img.alt = product.description;
  card.appendChild(img);

  const name = document.createElement("h4");
  name.textContent = product.name;
  card.appendChild(name);

  const price = document.createElement("p");
  price.textContent = `USD ${costUSD.toFixed(2)}`;
  card.appendChild(price);

  const quantityContainer = document.createElement("div");
  quantityContainer.style.display = "flex";
  quantityContainer.style.alignItems = "center";
  quantityContainer.style.gap = "5px";

  const decrease = document.createElement("button");
  decrease.textContent = "-";
  decrease.style.cursor = "pointer";

  const quantity = document.createElement("span");
  quantity.textContent = product.quantity;

  const increase = document.createElement("button");
  increase.classList.add("increase");
  increase.textContent = "+";
  increase.style.cursor = "pointer";

  decrease.addEventListener("click", () => {
    if (product.quantity > 1) {
      product.quantity--;
      localStorage.setItem("cart", JSON.stringify(cart));
      renderCart();
    }
  });

  increase.addEventListener("click", () => {
    product.quantity++;
    localStorage.setItem("cart", JSON.stringify(cart));
    renderCart();
  });

  quantityContainer.appendChild(decrease);
  quantityContainer.appendChild(quantity);
  quantityContainer.appendChild(increase);
  card.appendChild(quantityContainer);

  const subtotal = document.createElement("p");
  subtotal.textContent = `Subtotal: USD ${(costUSD * product.quantity).toFixed(
    2
  )}`;
  card.appendChild(subtotal);

  const remove = document.createElement("button");
  remove.textContent = "🗑";
  remove.style.cursor = "pointer";
  remove.addEventListener("click", () => {
    const index = cart.indexOf(product);
    cart.splice(index, 1);
    localStorage.setItem("cart", JSON.stringify(cart));
    renderCart();
  });
  card.appendChild(remove);

  return card;
};

const renderCart = () => {
  container.innerHTML = "";
  if (cart.length === 0) {
    container.innerHTML = '<h1 class="empty-cart">El carrito está vacío</h1>';
    actualizarBadge(0);
    return;
  }

  cart.forEach((product) => {
    container.appendChild(CartProductCard({ product }));
  });

  const totalAmount = cart.reduce((acc, p) => {
    const costUSD = p.currency === "UYU" ? p.cost / 40 : p.cost;
    return acc + costUSD * p.quantity;
  }, 0);

  const total = document.createElement("p");
  total.textContent = `Total: USD ${totalAmount.toFixed(2)}}`;
  total.classList.add("total-amount");
  container.appendChild(total);

  const totalCount = JSON.parse(localStorage.getItem("cart")).length;
  actualizarBadge(totalCount);
};

renderCart();
