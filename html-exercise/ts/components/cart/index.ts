import { Cart, CartItem } from './cart.entity.js';
import { getFromLocalStorage, saveToLocalStorage, StorageKey } from '../../services/localStorage.service.js';
import Product from '../product/product.entity.js';

const renderProductCart = (cartStorage: CartItem[]) => {
  const cartSection = document.querySelector('.section.section-cart');
  const cartEntity = new Cart(cartStorage);
  if (cartStorage && cartStorage.length) {
    cartSection.innerHTML = `
      <ul class="product-cart-list row">
        ${cartEntity.cartItems
          .sort((a: CartItem, b: CartItem) => a.id - b.id)
          .map((product: CartItem) => {
            const cartItemEntity = new CartItem(product);
            console.log(cartItemEntity);
            const { id, name, imageUrl, discount, price, quantity } = cartItemEntity;
            return `
              <li class="product-cart-item col col-12">
                <div class="product-cart">
                  <div class="product-cart-info">
                    <img src="${imageUrl}" alt="" class="product-cart-img" />
                    <div class="product-cart-desc">
                      <span class="product-cart-id">ID: ${id}</span>
                      <h4 class="product-cart-name">${name}</h4>
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
                    <span class="btn btn-outline" data-id="${id}">Delete</span>
                  </div>
                </div>
              </li>`;
          })
          .join('')}
      </ul>
      <h4 class="cart-total-price-all">Total: $${cartEntity.calcProductAllTotalPrice(cartStorage)}</h4>`;
  } else {
    cartSection.innerHTML = `
    <img src="./assets/images/cart-empty.png" class="cart-empty"/>`;
  }

  // Add Event Delete
  addEventForDeleteBtn();

  // Add Event Change Quantity
  addEventForChangeBtn();

  // Add Event Increase Button
  addEventForIncreaseBtn();

  // Add Event Decrease Button
  addEventForDecreaseBtn();
};

const addEventForIncreaseBtn = () => {
  const increaseBtnCollection = document.querySelectorAll<HTMLElement>('.increase.btn.btn-step-outline');
  increaseBtnCollection.forEach((increaseBtn) => {
    increaseBtn.addEventListener('click', () => {
      handleClickChangeQuantity(parseInt(increaseBtn.dataset.id), 1);
    });
  });
};

const addEventForDecreaseBtn = () => {
  const increaseBtnCollection = document.querySelectorAll<HTMLElement>('.decrease.btn.btn-step-outline');
  increaseBtnCollection.forEach((increaseBtn) => {
    increaseBtn.addEventListener('click', () => {
      handleClickChangeQuantity(parseInt(increaseBtn.dataset.id), -1);
    });
  });
};

const handleClickChangeQuantity = (id: number, step: number) => {
  const cartStorage = getFromLocalStorage(StorageKey.Product);
  const findProduct = cartStorage.filter((product: CartItem) => {
    return product.id === id;
  })[0];

  if (findProduct.quantity === 1) {
    handleDeleteProduct(findProduct.id);
  } else {
    findProduct.quantity += step;
    saveToLocalStorage(StorageKey.Product, cartStorage);
    renderProductCart(cartStorage);
  }
};

const addEventForDeleteBtn = () => {
  const deleteBtns = document.querySelectorAll<HTMLElement>('.product-cart-action .btn');
  deleteBtns.forEach((btn) => {
    btn.addEventListener('click', () => handleDeleteProduct(parseInt(btn.dataset.id)));
  });
};

const addEventForChangeBtn = () => {
  const quantityInputCollection = document.querySelectorAll<HTMLElement>('.product-cart-quantity');
  quantityInputCollection.forEach((quantityInput) => {
    quantityInput.addEventListener('change', (e) => {
      handleChangeQuantity(parseInt(quantityInput.dataset.id), parseInt((e.target as HTMLTextAreaElement).value));
    });
  });
};

const handleChangeQuantity = (id: number, quantity: number) => {
  const cartStorage = getFromLocalStorage(StorageKey.Product);
  const findProduct = cartStorage.find((item: CartItem) => {
    return item.id === id;
  });
  if (findProduct) {
    if (quantity === 0) {
      handleDeleteProduct(findProduct.id);
    } else {
      findProduct.quantity = quantity;
      saveToLocalStorage(StorageKey.Product, cartStorage);
      renderProductCart(cartStorage);
    }
  }
};

const handleDeleteProduct = (id: number) => {
  if (confirm('Do you want to delete this product?!!')) {
    const cartStorage = getFromLocalStorage(StorageKey.Product);
    const newData = cartStorage.filter((product: CartItem) => {
      return product.id !== id;
    });
    if (newData) {
      saveToLocalStorage(StorageKey.Product, newData);
      renderProductCart(newData);
    }
  }
};

export default renderProductCart;
