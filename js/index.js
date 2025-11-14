import { Nav } from "./Componentes/Nav.js"
import { Index } from "./Componentes/Index.js"
import { Categories } from "./Componentes/Categories.js"
import { Sell } from "./Componentes/Sell.js"
import { initCategories } from "./categories.js"
import { Products } from "./Componentes/Products.js"
import { initProducts } from "./products.js"
import { ProductInfo } from "./Componentes/ProductInfo.js"
import { initProductPage } from "./product-info.js"
import { Cart } from "./Componentes/Cart.js"
import { renderCart } from "./CartProductCard.js"
import { MyProfile } from "./Componentes/MyProfile.js"
import { initNavbarIcon } from "./navbar-icon.js"
import { applySavedTheme } from "./color-mode.js"
import { initProfileScript } from "./my-profile.js"


const nav = document.querySelector('.navbar>.container')
const root = document.querySelector('#root')

if (nav) {
  nav.innerHTML = Nav()
  initNavbarIcon()
  applySavedTheme()
}

function router() {
  const path = window.location.hash.slice(1) || '/'
  if (!root) return

  if (path === '/' || path === '/index') {
    root.innerHTML = Index()
  } else if (path === '/categories') {
    root.innerHTML = Categories()
    initCategories()
  } else if (path === '/sell') {
    root.innerHTML = Sell()
  } else if (path === '/products') {
    root.innerHTML = Products()
    initProducts()
  } else if (path === '/product-info') {
    root.innerHTML = ProductInfo()
    initProductPage()
  } else if (path === '/cart') {
    root.innerHTML = Cart()
    renderCart()
  } else if (path === '/my-profile') {
    root.innerHTML = MyProfile()
    initProfileScript()
  } else {
    root.innerHTML = `<h2>404 - Página no encontrada</h2>`
  }

  attachCategoryListeners()
}

document.addEventListener('click', (e) => {
  const link = e.target.closest('a')
  if (!link) return
  const href = link.getAttribute('href')
  if (href && href.startsWith('/')) {
    e.preventDefault()
    window.location.hash = href
  }
})

function attachCategoryListeners() {
  const autos = document.querySelector("#autos")
  const juguetes = document.querySelector("#juguetes")
  const muebles = document.querySelector("#muebles")
  if (autos) autos.addEventListener("click", () => {
    localStorage.setItem("catID", 101)
    window.location.hash = "#/products"
  })
  if (juguetes) juguetes.addEventListener("click", () => {
    localStorage.setItem("catID", 102)
    window.location.hash = "#/products"
  })
  if (muebles) muebles.addEventListener("click", () => {
    localStorage.setItem("catID", 103)
    window.location.hash = "#/products"
  })
}

window.addEventListener('hashchange', router)
router()
