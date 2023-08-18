import { Cart, CartItem } from './cart.entity.js';
import { StepEnum } from './cart.interface.js';
import { getFromLocalStorage, saveToLocalStorage, StorageKey } from '../../services/localStorage.service.js';
const renderProductCart = (cartStorage) => {
    const cartSection = document.querySelector('.section.section-cart');
    const cartEntity = new Cart(cartStorage);
    if (cartStorage && cartStorage.length) {
        cartSection.innerHTML = `
      <ul class="product-cart-list row">
        <div class="col col-9">
        ${cartEntity.cartItems
            .sort((a, b) => a.id - b.id)
            .map((product) => {
            const cartItemEntity = new CartItem(product);
            const { id, name, imageUrl, discount, price, quantity } = cartItemEntity;
            return `
              <li class="product-cart-item col col-12">
                <div class="product-cart">
                  <div class="product-cart-info">
                    <img src="${imageUrl}" alt="" class="product-cart-img" />
                    <div class="product-cart-desc">
                      <h4 class="product-cart-name">${name}</h4>
                      <span class="product-cart-id">ID: ${id}</span>
                    </div>
                    <p class="product-cart-prices">
                      <span class="sale-price ${discount ? 'active' : ''}">$
                      ${cartItemEntity.calcDiscountPrice(price, discount)}
                      </span>
                      <span class="original-price">${discount ? '$' + price : ''}</span>
                    </p>
                  </div>
                  <div class="product-cart-quantity-wrapper">
                  <button class="decrease btn btn-step-outline" data-id="${id}">-</button>
                  <input class="product-cart-quantity" type="number" min="0" name="number" id="" value="${quantity}" data-id="${id}"/>
                  <button class="increase btn btn-step-outline" data-id="${id}">+</button>
                  </div>
                  <p class="product-cart-total-price">Total: $
                  ${cartItemEntity.calcProductTotalPrice(cartItemEntity.calcDiscountPrice(price, discount), quantity)}
                  </p>
                  <div class="product-cart-action">
                    <span class="btn btn-delete-outline" data-id="${id}">Delete</span>
                  </div>
                </div>
              </li>`;
        })
            .join('')}
        </div>
        <h4 class="cart-total-price-all col col-3">Total: $${cartEntity.calcProductAllTotalPrice(cartStorage)}</h4>
      </ul>`;
    }
    else {
        cartSection.innerHTML = `
    <img src="./assets/images/cart-empty.png" class="cart-empty"/>`;
    }
    // Add Event Delete
    addEventForDeleteBtn();
    // Add Event Change Quantity
    addEventForChangeInput();
    // Add Event Increase Button
    addEventForIncreaseBtn();
    // Add Event Decrease Button
    addEventForDecreaseBtn();
};
const addEventForIncreaseBtn = () => {
    const increaseBtnCollection = document.querySelectorAll('.increase.btn.btn-step-outline');
    increaseBtnCollection.forEach((increaseBtn) => {
        increaseBtn.addEventListener('click', () => {
            handleClickChangeQuantity(parseInt(increaseBtn.dataset.id), StepEnum.INCREASE);
        });
    });
};
const addEventForDecreaseBtn = () => {
    const increaseBtnCollection = document.querySelectorAll('.decrease.btn.btn-step-outline');
    increaseBtnCollection.forEach((increaseBtn) => {
        increaseBtn.addEventListener('click', () => {
            handleClickChangeQuantity(parseInt(increaseBtn.dataset.id), StepEnum.DECREASE);
        });
    });
};
const handleClickChangeQuantity = (id, step) => {
    const cartStorage = getFromLocalStorage(StorageKey.Product);
    const findProduct = cartStorage.find((product) => {
        return product.id === id;
    });
    if (findProduct.quantity < 1) {
        handleDeleteProduct(findProduct.id);
        findProduct.quantity;
    }
    else {
        findProduct.quantity += step;
        saveToLocalStorage(StorageKey.Product, cartStorage);
        renderProductCart(cartStorage);
    }
};
const addEventForDeleteBtn = () => {
    const deleteBtns = document.querySelectorAll('.product-cart-action .btn');
    deleteBtns.forEach((btn) => {
        btn.addEventListener('click', () => handleDeleteProduct(parseInt(btn.dataset.id)));
    });
};
const addEventForChangeInput = () => {
    const quantityInputCollection = document.querySelectorAll('.product-cart-quantity');
    quantityInputCollection.forEach((quantityInput) => {
        quantityInput.addEventListener('change', (e) => {
            handleChangeQuantity(parseInt(quantityInput.dataset.id), parseInt(e.target.value));
        });
    });
};
const handleChangeQuantity = (id, quantity) => {
    const cartStorage = getFromLocalStorage(StorageKey.Product);
    const findProduct = cartStorage.find((item) => {
        return item.id === id;
    });
    if (findProduct) {
        if (quantity < 1) {
            handleDeleteProduct(findProduct.id);
        }
        else {
            findProduct.quantity += quantity;
            saveToLocalStorage(StorageKey.Product, cartStorage);
            renderProductCart(cartStorage);
        }
    }
};
const handleDeleteProduct = (id) => {
    const cartStorage = getFromLocalStorage(StorageKey.Product);
    const findProduct = cartStorage.find((product) => {
        return product.id === id;
    });
    console.log(findProduct);
    const isAcceptDelete = confirm('Do you want to delete this product?!!');
    if (isAcceptDelete) {
        const newData = cartStorage.filter((product) => {
            return product.id !== id;
        });
        if (newData) {
            saveToLocalStorage(StorageKey.Product, newData);
            renderProductCart(newData);
        }
    }
    else {
        if (findProduct.quantity === 0) {
            findProduct.quantity += 1;
            saveToLocalStorage(StorageKey.Product, cartStorage);
            renderProductCart(cartStorage);
        }
    }
};
export default renderProductCart;
