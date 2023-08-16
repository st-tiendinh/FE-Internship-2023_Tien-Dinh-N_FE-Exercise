function calcProductTotalPrice(price, quantity) {
  return price * quantity;
}

function renderProductCart() {
  const cartContainer = document.querySelector('.cart-page .container');
  const dataStorage = JSON.parse(window.localStorage.getItem('product'));
  if (dataStorage.length) {
    cartContainer.innerHTML += `
      <ul class="product-cart-list row">
        ${dataStorage
          .map((product) => {
            let { id, name, imageUrl, price } = product.data;
            return `
              <li class="product-cart-item col col-12">
                <div class="product-cart">
                  <img src="${imageUrl}" alt="" class="product-cart-img" />
                  <div class="product-cart-info">
                    <span class="product-cart-id">ID: ${id}</span>
                    <h4 class="product-cart-name">${name}</h4>
                  </div>
                  <p class="product-cart-price">$${price}</p>
                  <input class="product-cart-quantity" type="number" min="0" name="" id="" value="${
                    product.quantity
                  }" data-id="${id}"/>
                  <p class="product-cart-total-price">$${calcProductTotalPrice(price, product.quantity)}</p>
                  <div class="product-cart-action">
                    <span class="btn btn-outline">Delete</span>
                  </div>
                </div>
              </li>`;
          })
          .join('')}
      </ul>
      <h4 class="cart-total-price-all">Total: $${calcProductAllTotalPrice().toFixed(2)}</h4>
      `;
  }
}

renderProductCart();

function calcProductAllTotalPrice() {
  let cartStorage = JSON.parse(window.localStorage.getItem('product')) || [];
  return cartStorage.reduce((sum, item) => {
    return sum + item.quantity * item.data.price;
  }, 0);
}

function findProductById(id) {
  let cartStorage = JSON.parse(window.localStorage.getItem('product')) || [];
  let findProduct = cartStorage.find((item) => {
    return parseInt(item.data.id) === id;
  });
  return findProduct;
}

function handleChangeQuantity() {
  const inputQuantity = document.querySelectorAll('.product-cart-quantity');
  let cartStorage = JSON.parse(window.localStorage.getItem('product')) || [];
  inputQuantity.forEach((input) => {
    input.addEventListener('change', (e) => {
      calcProductTotalPrice(parseInt(e.target.value), findProductById(parseInt(input.dataset.id)).data.price);
      console.log(calcProductTotalPrice(parseInt(e.target.value), findProductById(parseInt(input.dataset.id)).data.price));
    });
  });
}

handleChangeQuantity();
