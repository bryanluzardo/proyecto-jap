import { actualizarBadge } from "../img/Cart-icon.js";

const containerSelector = ".cart-container";

let cart = JSON.parse(localStorage.getItem("cart") || "[]")

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
    if (index > -1) {
      cart.splice(index, 1);
      localStorage.setItem("cart", JSON.stringify(cart));
      renderCart();
    }
  });
  card.appendChild(remove);

  return card;
};

const getContainer = () => document.querySelector(containerSelector);

const renderCart = () => {
  const container = getContainer();
  cart = JSON.parse(localStorage.getItem("cart") || "[]");
  if (!container) return; 

  container.innerHTML = "";
 if (cart.length === 0) {
  container.innerHTML = '<h1 class="empty-cart">El carrito está vacío</h1>';
  actualizarBadge(0);
  document.dispatchEvent(new CustomEvent("totalAmountChanged", { detail: { value: 0 } }));

  return;
}

  cart.forEach((product) => {
    container.appendChild(CartProductCard({ product }));
  });

  const totalAmount = cart.reduce((acc, p) => {
    const costUSD = p.currency === "UYU" ? p.cost / 40 : p.cost;
    return acc + costUSD * p.quantity;
  }, 0);

  const value = totalAmount
  document.dispatchEvent(new CustomEvent("totalAmountChanged", { detail: { value } }))


  const total = document.createElement("p");
  total.textContent = `Total: USD ${totalAmount.toFixed(2)}`;
  total.classList.add("total-amount");
  container.appendChild(total);

  let count = 0;
  cart?.forEach((item) => (count += item.quantity));
  actualizarBadge(count);
};

if (window.location.hash === "#/cart") {
  setTimeout(renderCart, 0);
}

window.addEventListener("hashchange", () => {
  if (window.location.hash === "#/cart") {
    setTimeout(renderCart, 0);
  }
});

export { renderCart };


// a partir de este punto empieza el codigo de validación y feedback de compra

function buyValidation() {
  const finishBuying = document.querySelector("#finish-buy-button");

  const feedbackContainer = document.createElement("div");
  feedbackContainer.id = "feedbackCompra";
  feedbackContainer.style.margin = "12px 0";
  const cartSection = document.querySelector("#feedback-compra");
  cartSection.prepend(feedbackContainer);

  finishBuying.addEventListener("click", () => onFinishClick());

  function onFinishClick(e) {
    clearFeedback();
    const errors = [];

    // Validar dirección
    const addressOK = validateAddress(errors);

    // Validar forma de envío
    const shippingOK = validateShipping(errors);

    // Validar cantidades y carrito
    const productsOK = validateQuantities(errors);

    // Validar forma de pago
    const paymentOK = validatePayment(errors);

    // Si hay errores → mostrarlos
    if (errors.length > 0) {
      showErrors(errors);
      return;
    }

    // Si todo ta joya → éxito
    showSuccess("¡Compra realizada con éxito!");

    console.log("buyValidation se ejecuta");
console.log("finish-buy-button:", document.querySelector("#finish-buy-button"));

  }

  function validateAddress(errors) {
    const address = (getValue("#calle") || "").trim();
    const city = (getValue("#esquina") || "").trim();
    const country = (getValue("#numero") || "").trim();

    if (!address || !city || !country) {
      errors.push("Por favor completá la dirección y la ciudad.");
      highlightIfExists("#calle");
      highlightIfExists("#esquina");
      highlightIfExists("#numero");
      return false;
    }

    return true;
  }

  function validateShipping(errors) {
    const radio = document.querySelector('input[name="envio"]:checked');

    if (!radio) {
      errors.push("Por favor seleccioná un método de envío.");
      return false;
    }

    return true;
  }

  function validateQuantities(errors) {
    const cart = JSON.parse(localStorage.getItem("cart") || "[]");

    // Carrito vacío
    if (cart.length === 0) {
      errors.push("El carrito está vacío.");
      return false;
    }

    let ok = true;

    // Validar cantidades del carrito
    cart.forEach((item, i) => {
      const cantidad = Number(item.quantity);

      if (!Number.isFinite(cantidad) || cantidad <= 0) {
        ok = false;
        errors.push(
          `La cantidad del producto ${item.name || i + 1} debe ser mayor a 0.`
        );
      }
    });

    // Validar inputs visibles
    const inputs = document.querySelectorAll(".cantidad");
    inputs.forEach((input) => {
      const val = Number(input.value);
      if (!Number.isFinite(val) || val <= 0) {
        input.classList.add("input-error");
      } else {
        input.classList.remove("input-error");
      }
    });

    return ok;
  }

  function validatePayment(errors) {
    const radio = document.querySelector('input[name="pago"]:checked');

    let metodo = radio ? radio.value || radio.parentElement.textContent.trim() : null;

    if (!metodo) {
      errors.push("Por favor seleccioná un método de pago.");
      return false;
    }

    // Si el método es tarjeta → validar campos
    if (/tarjeta|crédito/i.test(metodo)) {
      const nro = (getValue("#numero-tarjeta") || "").trim();
      const venc = (getValue("#vencimiento") || "").trim();
      const cvv = (getValue("#cvc") || "").trim();

      if (!nro || !venc || !cvv) {
        errors.push(
          "Completá todos los datos de la tarjeta (número, titular, venc., CVV)."
        );
        ["#numero-tarjeta", "#vencimiento", "#cvc"].forEach(
          highlightIfExists
        );
        return false;
      }
    }

    return true;
  }

  //funciones auxiliares

  function getValue(selector) {
    const el = document.querySelector(selector);
    return el ? el.value : "";
  }

  function highlightIfExists(selector) {
    const el = document.querySelector(selector);
    if (el) el.classList.add("input-error");
  }

 function clearFeedback() {
    feedbackContainer.innerHTML = "";
    document.querySelectorAll(".input-error").forEach((el) => el.classList.remove("input-error"));
  }

  function showErrors(errores) {
    const ul = document.createElement("ul");
    ul.style.color = "#b71c1c";
    ul.style.background = "#ffebee";
    ul.style.padding = "10px";
    ul.style.borderRadius = "6px";
    ul.style.margin = "0";

    errores.forEach((msg) => {
      const li = document.createElement("li");
      li.textContent = msg;
      ul.appendChild(li);
    });

    feedbackContainer.appendChild(ul);
    feedbackContainer.scrollIntoView({ behavior: "smooth", block: "center" });
  }

  function showSuccess(msg) {
    const p = document.createElement("p");
    p.textContent = msg;
    p.style.color = "#1b5e20";
    p.style.background = "#e8f5e9";
    p.style.padding = "12px";
    p.style.borderRadius = "6px";
    p.style.margin = "0";
    feedbackContainer.appendChild(p);
    feedbackContainer.scrollIntoView({ behavior: "smooth", block: "center" });
  }
}

if (window.location.hash === "#/cart") {
  setTimeout(() => {
    renderCart();
    buyValidation();
  }, 500);
}



