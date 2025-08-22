const url = "https://japceibal.github.io/emercado-api/cats_products/101.json";
const productos = document.getElementById("productos");

fetch(url)
  .then((response) => response.json())
  .then((data) => {
    data.products.forEach((producto) => {
      // Contenedor principal del producto
      const div = document.createElement("div");
      div.className = "producto";

      // Imagen
      const img = document.createElement("img");
      img.className = "foto";
      img.src = producto.image;
      img.alt = producto.id;

      // Nombre y descripción
      const nombreDescripcion = document.createElement("div");
      nombreDescripcion.className = "nombre-descripcion";

      const h4 = document.createElement("h4");
      h4.className = "nombre";
      h4.textContent = producto.name;

      const pDescripcion = document.createElement("p");
      pDescripcion.className = "descripcion";
      pDescripcion.textContent = producto.description;

      nombreDescripcion.appendChild(h4);
      nombreDescripcion.appendChild(pDescripcion);

      // Precio con título
      const precioDiv = document.createElement("div");
      precioDiv.className = "precio-descripcion";

      const precioTitulo = document.createElement("h4");
      precioTitulo.textContent = "Precio";

      const precioValor = document.createElement("p");
      precioValor.className = "precio";
      precioValor.textContent = `${producto.currency} ${producto.cost}`;

      precioDiv.appendChild(precioTitulo);
      precioDiv.appendChild(precioValor);

      // Ventas con título
      const ventasDiv = document.createElement("div");
      ventasDiv.className = "ventas-descripcion";

      const ventasTitulo = document.createElement("h4");
      ventasTitulo.textContent = "Ventas totales";

      const ventasValor = document.createElement("p");
      ventasValor.className = "sold-count";
      ventasValor.textContent = producto.soldCount;

      ventasDiv.appendChild(ventasTitulo);
      ventasDiv.appendChild(ventasValor);

      //botón para comprar
      const bolsaDeCompras = document.createElement("div");
      bolsaDeCompras.className = "bolsa-de-compras";

      // Agrego todo al div principal
      div.appendChild(img);
      div.appendChild(nombreDescripcion);
      div.appendChild(precioDiv);
      div.appendChild(ventasDiv);
      div.appendChild(bolsaDeCompras);

      // Agrego el producto al contenedor principal
      productos.appendChild(div);
    });
  })
  .catch((error) => console.error("Error cargando productos:", error));

const contenedorgrande = document.querySelector(".contenedor");

contenedorgrande.appendChild(productos);
