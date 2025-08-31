import { Bolsa } from "../img/Bolsa-Compra.js";

const currentCategory = localStorage.getItem("catID");
const url = `https://japceibal.github.io/emercado-api/cats_products/${currentCategory}.json`;
const productos = document.getElementById("productos");
const contenedorgrande = document.querySelector(".contenedor");

fetch(url)
  .then((response) => response.json())
  .then((data) => {
    const h2 = document.createElement("h2");
    h2.textContent = `Categoría: ${data.catName}`;
    productos.appendChild(h2);

    data.products.forEach((producto) => {
      const { cost, currency, description, image, name, soldCount } = producto;

      const div = document.createElement("div");
      div.className = "producto";

      const img = document.createElement("img");
      img.className = "foto";
      img.src = image;
      img.alt = description;
      div.appendChild(img);

      const nombreYDescripcion = document.createElement("div");
      nombreYDescripcion.className = "nombre-descripcion";

      const h4 = document.createElement("h4");
      h4.className = "nombre";
      h4.textContent = name;

      const p = document.createElement("p");
      p.className = "descripcion";
      p.textContent = description;

      nombreYDescripcion.appendChild(h4);
      nombreYDescripcion.appendChild(p);
      div.appendChild(nombreYDescripcion);

      const precioYVendidos = document.createElement("div");
      precioYVendidos.className = "precio-ventas";

      const pPrecio = document.createElement("p");
      pPrecio.className = "precio";
      pPrecio.textContent = `${currency} ${cost}`;

      const pVendidos = document.createElement("p");
      pVendidos.className = "ventas";
      pVendidos.textContent = `Vendidos: ${soldCount}`;

      precioYVendidos.appendChild(pPrecio);
      precioYVendidos.appendChild(pVendidos);
      div.appendChild(precioYVendidos);

      const button = document.createElement("button");
      button.className = "boton";
      div.appendChild(button);

      function updateButton() {
        if (window.innerWidth < 520) {
          button.textContent = "Agregar al carrito";
        } else {
          button.innerHTML = Bolsa();
        }
      }
      
      window.addEventListener("resize", updateButton);
      
      productos.appendChild(div);
    });
  })
  .catch((error) => console.error("Error cargando productos:", error));
  
  contenedorgrande.appendChild(productos);
  