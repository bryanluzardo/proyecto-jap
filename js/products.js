import { ProductCard } from "./ProductCard.js";
import { updateButton } from "./utils.js";

const contenedorgrande = document.querySelector(".contenedor");
const currentCategory = localStorage.getItem("catID");
const url = `https://japceibal.github.io/emercado-api/cats_products/${currentCategory}.json`;
const divProductos = document.getElementById("productos");

let productosAPI = []; //para guardar los productos for real

fetch(url)
  .then((response) => response.json())
  .then((data) => {
    const h2 = document.createElement("h4");
    h2.textContent = `Te encuentras en la categoría: ${data.catName}`;
    divProductos.appendChild(h2);

    const divTituloExtra = document.getElementById("tituloExtraCategoria");
    const h1 = document.createElement("h1");
    h1.textContent = data.catName;
    divTituloExtra.appendChild(h1);

    productosAPI = data.products;
    render(productosAPI);
  })
  .catch((error) => console.error("Error cargando productos:", error));

//comento lo de abajo por si hace falta probarlo otra vez
//data.products.forEach((producto) => {
//productos.appendChild(ProductCard({ ...producto }));
//});
//})
//.catch((error) => console.error("Error cargando productos:", error));

// Botones responsivos
const observer = new ResizeObserver(() => {
  document.querySelectorAll(".boton").forEach((btn) => updateButton(btn));
});

observer.observe(document.body);

const contenedor = document.getElementById("contenedorProductos");
const formFiltro = document.getElementById("filtroPrecios");
const selectOrden = document.getElementById("ordenar");

let listaActual = []; // guardamos los productos filtrados/ordenados

// ordenar productos x precio asc, precio desc y relevancia
function render(lista) {
  contenedor.innerHTML = "";
  lista.forEach((p) => {
    contenedor.appendChild(ProductCard(p));
  });
}

function aplicarFiltrosYOrden() {
  const min = +document.getElementById("precioMin").value || 0;
  const max = +document.getElementById("precioMax").value || Infinity;
  const criterio = selectOrden.value;

  // Filtrar
  let lista = productosAPI.filter((p) => p.cost >= min && p.cost <= max);

  // Ordenar
  if (criterio === "precioAsc") lista.sort((a, b) => a.cost - b.cost);
  if (criterio === "precioDesc") lista.sort((a, b) => b.cost - a.cost);
  if (criterio === "relevancia")
    lista.sort((a, b) => b.soldCount - a.soldCount);

  listaActual = lista;
  render(listaActual);
}

// Filtrar con el formulario
formFiltro.addEventListener("submit", (e) => {
  e.preventDefault();
  aplicarFiltrosYOrden();
});

// Ordenar con el select
selectOrden.addEventListener("change", aplicarFiltrosYOrden);

render(productosAPI);
