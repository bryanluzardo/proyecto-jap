import { Bolsa } from "../img/Bolsa-Compra.js"
export const debounce = (fn, ms = 300) => {
    let timer
    return function (...args){
        clearTimeout(timer)
        timer = setTimeout(() => {
            fn.apply(this, args)
        }, ms)
    }
}

export const updateButton = (button) => {
    if (window.innerWidth < 520) {
      button.textContent = "Agregar al carrito";
    } else {
      button.innerHTML = Bolsa();
    }
  }