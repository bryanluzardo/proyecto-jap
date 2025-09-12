import { ProductCard } from "./ProductCard.js"
import { updateButton } from "./utils.js"

const contenedorgrande = document.querySelector(".contenedor")
const currentCategory = localStorage.getItem("catID")
const url = `https://japceibal.github.io/emercado-api/cats_products/${currentCategory}.json`;
const productos = document.getElementById("productos")


fetch(url)
  .then((response) => response.json())
  .then((data) => {
    const h2 = document.createElement("h2");
    h2.textContent = `Categoría: ${data.catName}`;
    productos.appendChild(h2);

    data.products.forEach((producto) => {

      productos.appendChild(ProductCard({...producto}));
    });
  })
  .catch((error) => console.error("Error cargando productos:", error));

const observer = new ResizeObserver(() => {
  document.querySelectorAll(".boton").forEach(btn => updateButton(btn));
})

observer.observe(document.body)

contenedorgrande.appendChild(productos)


  
  
