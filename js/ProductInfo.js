import { changeGallery } from "./gallery.js";
import { actualizarBadge } from "../img/Cart-icon.js";

export const ProductInfo = ({
  id,
  category,
  cost,
  currency,
  description,
  images,
  name,
  soldCount,
}) => {
  const productDiv = document.createElement("div");
  productDiv.classList.add("product-info-container");
  // div para imagenes
  const div1 = document.createElement("div");
  div1.classList.add("product-info-images");
  // div para el resto
  const div2 = document.createElement("div");
  div2.classList.add("product-info-details");

  let currentImage = 0;

  // la imagen grande
  const mainImage = document.createElement("img");
  mainImage.classList.add("imagen-principal");

  // la galeria chica
  const gallery = document.createElement("div");
  gallery.classList.add("galleria");

  changeGallery({
    images,
    currentImage,
    mainImage,
    gallery,
    div: div1,
  });

  // titulo
  const titleDiv = document.createElement("div");
  titleDiv.classList.add("titulo");
  const title = document.createElement("h2");
  title.textContent = name;
  titleDiv.appendChild(title);

  // review (la parte de las estrellas), por ahora debe ser la cantidad de vendidos
  const review = document.createElement("small");
  const stars = (
    <span style="color: gold; font-size: 18px; margin-right: 60%;">★★★★★</span>
  );
  review.innerHTML = `${stars} (${soldCount} vendidos)`;
  review.classList.add("review");
  titleDiv.appendChild(review);

  // precio
  const price = document.createElement("h4");
  price.classList.add("precio");
  price.textContent = `${currency} ${cost}`;
  titleDiv.appendChild(price);

  div2.appendChild(titleDiv);

  // línea dividiendo
  const divider = document.createElement("hr");
  divider.classList.add("divider");
  div2.appendChild(divider);

  // descripcion
  const descripcionDiv = document.createElement("div");
  descripcionDiv.classList.add("descripcion-div");
  const productDescription = document.createElement("p");
  productDescription.classList.add("descripcion-producto");
  productDescription.textContent = description;

  descripcionDiv.appendChild(productDescription);

  div2.appendChild(descripcionDiv);

  // linea dividiendo
  const hr = document.createElement("hr");
  hr.classList.add("linea");
  div2.appendChild(hr);

  // botn de comprar, color y el input con la cantidad
  // no son funcionales por ahora y el de color es un extra
  const buyButton = document.createElement("div");
  buyButton.classList.add("buy-button");

  const quantity = document.createElement("input");
  quantity.classList.add("cantidad-productos");
  quantity.type = "number";
  quantity.value = 1;
  quantity.min = 1;
  quantity.max = 10;
  quantity.step = 1;

  buyButton.appendChild(quantity);

  // selector de color (extra)
  const colorSelectWrapper = document.createElement("div");
  colorSelectWrapper.classList.add("color-select-wrapper");

  const selectedColor = document.createElement("div");
  selectedColor.classList.add("selected-color");
  selectedColor.style.backgroundColor = "#000000";
  colorSelectWrapper.appendChild(selectedColor);

  const colorOptions = document.createElement("div");
  colorOptions.classList.add("color-options");

  const colores = ["#000000", "#4f4f4fff", "#8b8b8bff", "#b8b8b8ff"];

  colores.forEach((c) => {
    const colorBtn = document.createElement("div");
    colorBtn.classList.add("color-btn");
    colorBtn.style.backgroundColor = c;

    colorBtn.addEventListener("click", () => {
      selectedColor.style.backgroundColor = c;
      colorOptions.style.display = "none";
    });

    colorOptions.appendChild(colorBtn);
  });

  colorSelectWrapper.appendChild(colorOptions);

  selectedColor.addEventListener("click", () => {
    colorOptions.style.display =
      colorOptions.style.display === "flex" ? "none" : "flex";
  });

  buyButton.appendChild(colorSelectWrapper);

  // botón de agregar al carrito
  const button = document.createElement("button");
  button.onclick = () => {
    const currentCart = JSON.parse(localStorage.getItem("cart") || "[]");
    const productIndex = currentCart.findIndex((p) => p.id === id);
    if (productIndex !== -1) {
      return;
    } else {
      currentCart.push({
        id,
        cost,
        currency,
        description,
        images: images[currentImage],
        name,
        quantity: parseInt(quantity.value),
      });
    }
    localStorage.setItem("cart", JSON.stringify(currentCart));
    const totalCount = JSON.parse(localStorage.getItem("cart")).length;
    actualizarBadge(totalCount);
  };

  button.classList.add("agregar-carrito");
  button.innerText = "Agregar al carrito";

  const cartBtn = document.createElement("button");
  cartBtn.classList.add("agregar-carrito");
  cartBtn.innerText = "Comprar";
  cartBtn.onclick = () => {
    const currentCart = JSON.parse(localStorage.getItem("cart") || "[]");
    const productIndex = currentCart.findIndex((p) => p.id === id);
    if (productIndex !== -1) {
      return;
    } else {
      currentCart.push({
        id,
        cost,
        currency,
        description,
        images: images[currentImage],
        name,
        quantity: parseInt(quantity.value),
      });
    }
    localStorage.setItem("cart", JSON.stringify(currentCart));
    const totalCount = JSON.parse(localStorage.getItem("cart")).length;
    actualizarBadge(totalCount);

    window.location.href = "cart.html";
  };

  buyButton.appendChild(cartBtn);

  buyButton.appendChild(button);
  div2.appendChild(buyButton);

  //div para ver el carrito que por ahora no funciona
  const divVerCarrito = document.createElement("div");
  divVerCarrito.classList.add("ver-carrito-div");

  //carrito tipo vector
  const carritoIcon = document.createElement("img");
  carritoIcon.src = "img/carro-de-la-compra.png";
  carritoIcon.alt = "Icono carrito";
  carritoIcon.classList.add("carrito-icon");
  divVerCarrito.appendChild(carritoIcon);

  //botón de ver carrito
  const verCarrito = document.createElement("p");
  verCarrito.classList.add("ver-carrito");
  verCarrito.innerText = "Ver carrito";
  divVerCarrito.appendChild(verCarrito);

  div2.appendChild(divVerCarrito);

  // linea dividiendo
  const hr2 = document.createElement("hr");
  hr2.classList.add("linea2");
  div2.appendChild(hr2);

  // los extras que aparecen abajo
  const extras = document.createElement("div");
  extras.classList.add("extra-details");
  const categoryList = document.createElement("p");
  categoryList.classList.add("extra-details-p");
  categoryList.innerHTML = `<strong>Categoria: </strong> ${category}`;

  const tagList = document.createElement("p");
  tagList.innerHTML = `<strong>Tag: </strong> tag1, tag2`;

  // los links, los quito por ahora
  //const share = document.createElement("div");
  //const shareOptions = links.map((link) => {
  //return <a target='_blank' href=${link}>${link.split("")[0]}</a>;
  //});

  //share.innerHTML = <strong> Compartir: </strong> ${shareOptions};

  extras.appendChild(categoryList);
  extras.appendChild(tagList);
  //extras.appendChild(share);

  div2.appendChild(extras);

  productDiv.appendChild(div1);
  productDiv.appendChild(div2);

  return productDiv;
};
