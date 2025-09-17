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

  <!--filtros entrega 3-->   
const productos = [
  { nombre: "Zapatillas", precio: 2500 },
  { nombre: "Remera", precio: 800 },
  { nombre: "Pantalón", precio: 1500 },
  { nombre: "Campera", precio: 4000 }
];

const contenedor = document.getElementById("contenedorProductos");

function render(lista) {
  contenedor.innerHTML = lista.map(p => `<p>${p.nombre} - $${p.precio}</p>`).join("");
}

document.getElementById("filtroPrecios").addEventListener("submit", e => {
  e.preventDefault();
  const min = +document.getElementById("precioMin").value || 0;
  const max = +document.getElementById("precioMax").value || Infinity;
  render(productos.filter(p => p.precio >= min && p.precio <= max));
});

render(productos); // muestra todo al inicio




// ordenar productos x precio asc, precio desc y relevancia


const productos = [
  { nombre: "Zapatillas", precio: 2500, vendidos: 120 },
  { nombre: "Remera", precio: 800, vendidos: 300 },
  { nombre: "Pantalón", precio: 1500, vendidos: 200 },
  { nombre: "Campera", precio: 4000, vendidos: 80 }
];

const contenedor = document.getElementById("contenedorProductos");
const formFiltro = document.getElementById("filtroPrecios");
const selectOrden = document.getElementById("ordenar");

let listaActual = [...productos]; // guardamos los productos filtrados/ordenados

function render(lista) {
  contenedor.innerHTML = lista.map(
    p => `<p>${p.nombre} - $${p.precio} | Vendidos: ${p.vendidos}</p>`
  ).join("");
}

function aplicarFiltrosYOrden() {
  const min = +document.getElementById("precioMin").value || 0;
  const max = +document.getElementById("precioMax").value || Infinity;
  const criterio = selectOrden.value;

  // Filtrar
  let lista = productos.filter(p => p.precio >= min && p.precio <= max);

  // Ordenar
  if (criterio === "precioAsc") lista.sort((a, b) => a.precio - b.precio);
  if (criterio === "precioDesc") lista.sort((a, b) => b.precio - a.precio);
  if (criterio === "relevancia") lista.sort((a, b) => b.vendidos - a.vendidos);

  listaActual = lista;
  render(listaActual);
}

// Filtrar con el formulario
formFiltro.addEventListener("submit", e => {
  e.preventDefault();
  aplicarFiltrosYOrden();
});

// Ordenar con el select
selectOrden.addEventListener("change", aplicarFiltrosYOrden);


render(productos);


  
  
