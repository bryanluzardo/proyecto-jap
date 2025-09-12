import { ProductInfo } from "./ProductInfo.js"
import { ProductCard } from "./ProductCard.js"
const currentProduct = window.localStorage.getItem('currentProductID')
const url = `https://japceibal.github.io/emercado-api/products/${currentProduct}.json`
const contenedor = document.querySelector('.contenedor')


fetch(url)
    .then(response => response.json())
    .then(product => {
        contenedor.appendChild(ProductInfo({...product}))
        const relatedProductsContainer = document.createElement('div')
        relatedProductsContainer.classList.add('related-products')

        Array.from(product.relatedProducts).forEach(rel => {
            relatedProductsContainer.appendChild(ProductCard({...rel, isRelated: true}))
        })
        contenedor.appendChild(relatedProductsContainer)
    })

