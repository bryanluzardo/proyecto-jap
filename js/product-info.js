import { ProductInfo } from "./ProductInfo.js";
import { ProductCard } from "./ProductCard.js";
import { crearResenia } from "./crearReseñas.js";
const currentProduct = window.localStorage.getItem("currentProductID");
const url = `https://japceibal.github.io/emercado-api/products/${currentProduct}.json`
const contenedor = document.querySelector(".contenedor");

fetch(url)
  .then((response) => response.json())
  .then((product) => {
    contenedor.appendChild(ProductInfo({ ...product }));
    contenedor.appendChild(crearResenia())

    const relatedWrapper = document.createElement("div");
    relatedWrapper.classList.add("related-wrapper");

    const titulo = document.createElement("h3");
    titulo.classList.add("titulo-related");
    titulo.textContent = "Productos relacionados";
    relatedWrapper.appendChild(titulo);

    const relatedProductsContainer = document.createElement("div");
    relatedProductsContainer.classList.add("related-products");

    Array.from(product.relatedProducts).forEach((rel) => {
      relatedProductsContainer.appendChild(
        ProductCard({ ...rel, isRelated: true })
      );
    });

    relatedWrapper.appendChild(relatedProductsContainer);
    contenedor.appendChild(relatedWrapper);
  });