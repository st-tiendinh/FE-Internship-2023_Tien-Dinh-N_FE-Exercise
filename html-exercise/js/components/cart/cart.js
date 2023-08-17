import { calcDiscountPrice, calcProductTotalPrice, calcProductAllTotalPrice } from '../../utils/calculator.js';
import { getFromLocalStorage, saveToLocalStorage, StorageKey } from '../../services/localStorage.service.js';
const renderProductCart = (cartStorage) => {
    const cartContainer = document.querySelector('.cart-page .container');
    if (cartStorage && cartStorage.length) {
        cartContainer.innerHTML = `
      <ul class="product-cart-list row">
        ${cartStorage
            .sort((a, b) => a.id - b.id)
            .map((product) => {
            const { id, name, imageUrl, discount, price, quantity } = product;
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
    const quantityInputCollection = document.querySelectorAll('.product-cart-quantity');
    quantityInputCollection.forEach((quantityInput) => {
        quantityInput.addEventListener('change', (e) => handleChangeQuantity(parseInt(quantityInput.dataset.id), parseInt(e.target.value)));
    });
};
const handleChangeQuantity = (id, quantity) => {
    const cartStorage = getFromLocalStorage(StorageKey.Product);
    const findProduct = cartStorage.find((item) => {
        return item.id === id;
    });
    if (findProduct) {
        if (quantity === 0) {
            handleDeleteProduct(findProduct.id);
        }
        else {
            findProduct.quantity = quantity;
            saveToLocalStorage(StorageKey.Product, cartStorage);
            renderProductCart(cartStorage);
        }
    }
};
const handleDeleteProduct = (id) => {
    if (confirm('Do you want to delete this product?!!')) {
        const cartStorage = getFromLocalStorage(StorageKey.Product);
        const newData = cartStorage.filter((product) => {
            return product.id !== id;
        });
        saveToLocalStorage(StorageKey.Product, newData);
        renderProductCart(cartStorage);
    }
};
export default renderProductCart;
