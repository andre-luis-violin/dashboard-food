import { data } from './data.js'

function createListItemProduct(id, name, price, image) {
  return `
    <li data-id="${id}">
      <a class="list-menu" href="#">
        <div class="list-img">
          <img src="${image}" alt="">
        </div>
        <span class="list-name">${name}</span>
        <span class="list-price">R$ ${price}</span>
      </a>
    </li>
  `
}

function productsList() {
  const cardapio = document.querySelector('.menu-list')

  const listProducts = data.reduce(function (accumulator, { id, name, price, image }) {
    accumulator += createListItemProduct(id, name, price, image)
    return accumulator
  }, '')

  cardapio.innerHTML = listProducts
}

productsList()




const productsDOM = document.querySelectorAll('[data-id]')
let order = JSON.parse(localStorage.getItem('order')) || []

productsDOM.forEach(productIem => {
  productIem.addEventListener('click', function (event) {
    const ID = event.currentTarget.dataset.id

    const productClicked = data.find(function (product) {
      return Number(ID) === product.id
    })
    order.push(productClicked)
    localStorage.setItem('order', JSON.stringify(order))

    console.log('Pedidos: ', order)

    
    // const orderDOM = document.querySelector('.order-list')
    
    // const listProduct = order.reduce((accumulator, {id, name, price, image}) => {
    //   return accumulator += `
    //     <li>${id} - ${name} ${price}</li>
    //   `
    // }, '')
    
    // orderDOM.innerHTML = listProduct


  })
})