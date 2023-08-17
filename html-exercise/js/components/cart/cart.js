import { calcDiscountPrice, calcProductTotalPrice, calcProductAllTotalPrice } from '../../utils/calculator.js';
import { getFromLocalStorage, saveToLocalStorage } from '../../services/localStorage.service.js';
const renderProductCart = (cartStorage) => {
    const cartContainer = document.querySelector('.cart-page .container');
    if (cartStorage && cartStorage.length) {
        cartContainer.innerHTML = `
      <ul class="product-cart-list row">
        ${cartStorage
            .map((product) => {
            let { id, name, imageUrl, discount, price, quantity } = product;
            return `
              <li class="product-cart-item col col-12">
                <div class="product-cart">
                  <img src="${imageUrl}" alt="" class="product-cart-img" />
                  <div class="product-cart-info">
                    <span class="product-cart-id">ID: ${id}</span>
                    <h4 class="product-cart-name">${name}</h4>
                  </div>
                  <p class="product-cart-price">$${calcDiscountPrice(price, discount)}</p>
                  <input class="product-cart-quantity" type="number" min="0" name="" id="" value="${quantity}" data-id="${id}"/>
                  <p class="product-cart-total-price">$${calcProductTotalPrice(calcDiscountPrice(price, discount), quantity)}</p>
                  <div class="product-cart-action">
                    <span class="btn btn-outline" data-id="${id}">Delete</span>
                  </div>
                </div>
              </li>`;
        })
            .join('')}
      </ul>
      <h4 class="cart-total-price-all">Total: $${calcProductAllTotalPrice(cartStorage)}</h4>`;
    }
    else {
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
const handleChangeQuantity = (id, quantity) => {
    let cartStorage = getFromLocalStorage('product');
    let findProduct = cartStorage.find((item) => {
        return item.id === id;
    });
    if (quantity === 0) {
        handleDeleteProduct(findProduct.id);
        return;
    }
    findProduct.quantity = quantity;
    saveToLocalStorage('product', cartStorage);
    renderProductCart(cartStorage);
};
const handleDeleteProduct = (id) => {
    if (!confirm('Do you want to delete this product?!!')) {
        return;
    }
    let cartStorage = getFromLocalStorage('product');
    let newData = cartStorage.filter((product) => {
        return product.id !== id;
    });
    cartStorage = [...newData];
    saveToLocalStorage('product', cartStorage);
    renderProductCart(cartStorage);
};
export default renderProductCart;
