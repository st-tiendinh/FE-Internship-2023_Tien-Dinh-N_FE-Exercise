const renderProductCart = (dataStorageParam) => {
  const cartContainer = document.querySelector('.cart-page .container');
  const dataStorage = dataStorageParam;
  if (dataStorage && dataStorage.length) {
    cartContainer.innerHTML = `
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
                    <span class="btn btn-outline" data-id="${id}">Delete</span>
                  </div>
                </div>
              </li>`;
          })
          .join('')}
      </ul>
      <h4 class="cart-total-price-all">Total: $${calcProductAllTotalPrice()}</h4>`;
  } else {
    cartContainer.innerHTML = `
    <img src="./assets/images/cart-empty.png" class="cart-empty"/>`;
  }

  // Add Event Delete
  addEventForDeleteBtn();

  // Add Event Change Quantity
  addEventForChangeBtn();
};

const addEventForDeleteBtn = () => {
  const deleteBtns = document.querySelectorAll('.product-cart-action .btn');
  deleteBtns.forEach((btn) => {
    btn.addEventListener('click', () => handleDeleteProduct(parseInt(btn.dataset.id)));
  });
};

const addEventForChangeBtn = () => {
  const inputQuantity = document.querySelectorAll('.product-cart-quantity');
  inputQuantity.forEach((input) => {
    input.addEventListener('change', (e) => handleChangeQuantity(parseInt(input.dataset.id), parseInt(e.target.value)));
  });
};

const calcProductTotalPrice = (price, quantity) => {
  return (price * quantity).toFixed(2);
};

const calcProductAllTotalPrice = () => {
  let cartStorage = JSON.parse(window.localStorage.getItem('product')) || [];
  return cartStorage
    .reduce((sum, item) => {
      return sum + item.quantity * item.data.price;
    }, 0)
    .toFixed(2);
};

const handleChangeQuantity = (id, quantity) => {
  let cartStorage = JSON.parse(window.localStorage.getItem('product')) || [];
  let findProduct = cartStorage.find((item) => {
    return item.data.id === id;
  });

  if (quantity === 0) {
    handleDeleteProduct(findProduct.data.id);
    return;
  }

  findProduct.quantity = quantity;
  localStorage.setItem('product', JSON.stringify(cartStorage));
  renderProductCart(cartStorage);
};

const handleDeleteProduct = (id) => {
  let cartStorage = JSON.parse(window.localStorage.getItem('product')) || [];
  let newData = cartStorage.filter((product) => {
    return product.data.id !== id;
  });

  cartStorage = [...newData];
  localStorage.setItem('product', JSON.stringify(cartStorage));
  renderProductCart(cartStorage);
};

renderProductCart(JSON.parse(window.localStorage.getItem('product')));
