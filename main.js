import { data } from './data.js'

function formatCurrency(value) {
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL'
  }).format(value)
}

function createListItemProduct(id, name, price, image) {
  const formatedPrice = formatCurrency(price)

  return `
    <li data-id="${id}">
      <a class="list-menu" href="#">
        <div class="list-img">
          <img src="${image}" alt="">
        </div>
        <span class="list-name">${name}</span>
        <span class="list-price">${formatedPrice}</span>
      </a>
    </li>
  `
}

function productsList(categorySelected = '') {
  const cardapio = document.querySelector('.menu-list')

  const listProducts = data.reduce(function (accumulator, { id, name, price, image, category }) {
    if (!categorySelected || categorySelected === 'all') {
      accumulator += createListItemProduct(id, name, price, image)
    }
    
    if (categorySelected === category) {
      accumulator += createListItemProduct(id, name, price, image)
    }
    return accumulator
  }, '')

  cardapio.innerHTML = listProducts
}

productsList()


const categories = document.querySelectorAll('.item-menu')

categories.forEach(category => {
  category.onclick = (event) => {
    let i = 0
    while (i < categories.length) {
      categories[i++].classList.remove('active')
    }
    category.classList.add('active')
    console.log(category);
    const categorySelected = event.currentTarget.dataset.category
    productsList(categorySelected)
  }
})



function createListItemProductOrder(id, name, price, image) {
  const formatedPrice = formatCurrency(price)

  return `
    <li class="order-item" data-idorder="${id}">
      <div class="order-img">
        <img src="${image}" alt="">
      </div>
      <div class="order-text">
        <span class="order-name">${name}</span>
        <span class="order-price">${formatedPrice}</span>
      </div>
      <div class="order-quantity">
        <input class="order-qty" type="number" min="1" value="1" data-idproduct="${id}"/>
        <span class="order-total">${formatedPrice}</span>
      </div>
    </li>
  `
}

function orderLoader(order) {
  const orderDOM = document.querySelector('.order-list')
  const listProduct = order.reduce((accumulator, {id, name, price, image}) => accumulator += createListItemProductOrder(id, name, price, image), '')
  orderDOM.innerHTML = listProduct
}

function changeQuantity() {
  const quantities = document.querySelectorAll('.order-qty')
  const prices = document.querySelectorAll('.order-total')

  if (quantities) {
    for (let i = 0; i < quantities.length; i++) {
      quantities[i].oninput = (event) => {
        const idProduct = Number(quantities[i].dataset.idproduct)
        const totalPrice = formatCurrency(data[idProduct - 1].price * Number(quantities[i].value))
        prices[i].innerHTML = totalPrice
      }
    }
  }
}

function OrderList() {
  const productsDOM = document.querySelectorAll('[data-id]')

  let order = JSON.parse(localStorage.getItem('order')) || []

  orderLoader(order)
  changeQuantity()
  
  productsDOM.forEach(productIem => {
    productIem.addEventListener('click', function (event) {
      const ID = event.currentTarget.dataset.id
  
      const productClicked = data.find(({ id }) => Number(ID) === id)
      
      order.push(productClicked)
      localStorage.setItem('order', JSON.stringify(order))
      orderLoader(order)
      changeQuantity()
    })
  })
}

OrderList()

