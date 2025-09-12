const links = [
    'jfsad',
    'gasdfkads',
    'asdkfjndkjasf'
]

export const ProductInfo = ({category, cost, currency, description, images, name, soldCount}) => {
    
    const productDiv = document.createElement('div')
    // div para imagenes
    const div1 = document.createElement('div')
    // div para el resto
    const div2 = document.createElement('div')

    let currentImage = 0

    // la imagen grande
    const mainImage = document.createElement('img')
    mainImage.classList.add('imagen-principal')
    
    // la galeria chica
    const gallery = document.createElement('div')
    gallery.classList.add('galleria')

    const changeGallery = () => {
        mainImage.src = images[currentImage]
        mainImage.alt = `Imagen ${currentImage + 1}`
        gallery.innerHTML = ''


        // crea cada imagen de galeria
        images.forEach((imgSrc, index) => {
            if (index !== currentImage) {
                const img = document.createElement('img');
                img.src = imgSrc
                img.alt = `Imagen ${index + 1}`
                img.addEventListener('click', () => {
                    currentImage = index
                    changeGallery()
                });
                gallery.appendChild(img)
            }
        })

        if (!div1.contains(mainImage)) div1.appendChild(mainImage)
        if (!div1.contains(gallery)) div1.appendChild(gallery)
    }

    changeGallery()

    

    
    // titulo
    const titleDiv = document.createElement('div')
    titleDiv.classList.add('titulo')
    const title = document.createElement('h2')
    title.textContent = name
    titleDiv.appendChild(title)

    // review (la parte de las estrellas)
    const review = document.createElement('small')
    review.textContent = 'Muy bueno xd'
    titleDiv.appendChild(review)

    // precio
    const price = document.createElement('h4')
    price.textContent = `$${cost} ${currency}`
    titleDiv.appendChild(price)

    div2.appendChild(titleDiv)

    // descripcion
    const productDescription = document.createElement('p')
    productDescription.textContent = description

    div2.appendChild(productDescription)

    // botn de comprar y el input con la cantidad
    const buyButton = document.createElement('div')
    const quantity = document.createElement('input')
    quantity.type = 'text'
    quantity.value = 1
    quantity.readOnly = true

    buyButton.appendChild(quantity)
    
    const button = document.createElement('button')
    button.innerText = 'Agregar al carrito'
    
    buyButton.appendChild(button)
    div2.appendChild(buyButton)

    // cantidad de ventas
    const sellCount = document.createElement('p')
    sellCount.textContent = `Vendidos: ${soldCount}`

    div2.appendChild(sellCount)


    // los extras que aparecen abajo
    const extras = document.createElement('div')
    const categoryList = document.createElement('p')
    categoryList.innerHTML = `<strong>Categoria: </strong> ${category}`
    
    const tagList = document.createElement('p')
    tagList.innerHTML = `<strong>Tag: </strong> no se`

    // los links
    const share = document.createElement('div')
    const shareOptions = links.map(link => {
        return `<a target='_blank' href=${link}>${link.split('')[0]}</a>`
    })


    share.innerHTML = `<strong> Compartir: </strong> ${shareOptions}`

    extras.appendChild(categoryList)
    extras.appendChild(tagList)
    extras.appendChild(share)

    div2.appendChild(extras)

    productDiv.appendChild(div1)
    productDiv.appendChild(div2)

    return productDiv
}