import { Bolsa } from "../img/Bolsa-Compra.js";
import { initProductPage } from "./product-info.js";


export const ProductCard = ({id, cost, currency, description, image, name, soldCount, isRelated = false}) => {
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
    if (isRelated === false) nombreYDescripcion.appendChild(p);
    div.appendChild(nombreYDescripcion);

    if(isRelated === false) {
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
        button.innerHTML = window.innerWidth < 520 ? "Comprar" : Bolsa()
        div.appendChild(button);
    }

    div.onclick = () => {
        window.localStorage.removeItem('currentProduct')
        window.localStorage.setItem('currentProductID', id)
        initProductPage()
        window.scrollTo({ top: 0, behavior: "smooth" })
    }

    return div
} 


