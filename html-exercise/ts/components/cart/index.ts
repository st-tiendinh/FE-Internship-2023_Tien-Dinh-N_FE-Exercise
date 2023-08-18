import { Cart, CartItem } from './cart.entity.js';
import { StepEnum } from './cart.interface.js';
import { getFromLocalStorage, saveToLocalStorage, StorageKey } from '../../services/localStorage.service.js';

const renderProductCart = (cartStorage: CartItem[]) => {
  const cartSection = document.querySelector('.section.section-cart');
  const cartEntity = new Cart(cartStorage);
  if (cartStorage && cartStorage.length) {
    cartSection.innerHTML = `
      <div class="row">
        <div class="col col-9">
          <div class="section-cart-header row">
            <h4 class="section-cart-header-title col col-6">Product</h4>
            <h4 class="section-cart-header-title col col-3">Quantity</h4>
            <h4 class="section-cart-header-title col col-3">Price</h4>
          </div>
          <ul class="product-cart-list">
            ${cartEntity.cartItems
              .sort((a: CartItem, b: CartItem) => a.id - b.id)
              .map((product: CartItem) => {
                const cartItemEntity = new CartItem(product);
                const { id, name, imageUrl, discount, price, quantity } = cartItemEntity;
                return `
                  <li class="product-cart-item">
                    <div class="product-cart row">
                      <div class="product-cart-info col col-6">
                        <img src="${imageUrl}" alt="" class="product-cart-img" />
                        <div class="product-cart-desc">
                          <h4 class="product-cart-name">${name}</h4>
                          <span class="product-cart-id">ID: ${id}</span>
                          <div class="product-cart-prices">
                            <span class="sale-price ${discount ? 'active' : ''}">$
                            ${cartItemEntity.calcDiscountPrice(price, discount)}
                            </span>
                            <span class="original-price">${discount ? '$' + price : ''}</span>
                          </div>
                        </div>
                      </div>
                      <div class="product-cart-action col col-3">
                        <div class="product-cart-quantity-wrapper">
                          <button class="decrease btn btn-step-outline" data-id="${id}">-</button>
                          <input class="product-cart-quantity-input" type="number" min="0" name="number" id="" value="${quantity}" data-id="${id}"/>
                          <button class="increase btn btn-step-outline" data-id="${id}">+</button>
                        </div>
                        <span class="btn btn-delete-outline" data-id="${id}">Delete</span>
                      </div>

                      <div class="product-cart-total col col-3">
                        <p class="product-cart-total-price">
                        $${cartItemEntity.calcProductTotalPrice(
                          cartItemEntity.calcDiscountPrice(price, discount),
                          quantity
                        )}
                        </p>
                      </div>
                    </div>
                  </li>`;
              })
              .join('')}
          </ul>
        </div>
        <div class="col col-3">
              <div class="cart-checkout">
                <div class="cart-checkout-info">
                  <h4 class="cart-checkout-total-title">Total</h4>
                  <span class="cart-checkout-total-price">$${cartEntity.calcProductAllTotalPrice(cartStorage)}</span>
                </div>
                <span class="btn btn-checkout-primary">Buy now</span>
              </div>
            </div>
          </div>`;
  } else {
    cartSection.innerHTML = `
    <div class="cart-empty">
      <img src="./assets/images/cart-empty.png" class="cart-empty-img"/>
      <a href="index.html" class="btn btn-outline-primary">Continue shopping</a>
    </div>`;
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
  const increaseBtnCollection = document.querySelectorAll<HTMLElement>('.increase.btn.btn-step-outline');
  increaseBtnCollection.forEach((increaseBtn) => {
    increaseBtn.addEventListener('click', () => {
      handleClickChangeQuantity(parseInt(increaseBtn.dataset.id), StepEnum.INCREASE);
    });
  });
};

const addEventForDecreaseBtn = () => {
  const increaseBtnCollection = document.querySelectorAll<HTMLElement>('.decrease.btn.btn-step-outline');
  increaseBtnCollection.forEach((increaseBtn) => {
    increaseBtn.addEventListener('click', () => {
      handleClickChangeQuantity(parseInt(increaseBtn.dataset.id), StepEnum.DECREASE);
    });
  });
};

const handleClickChangeQuantity = (id: number, step: number) => {
  const cartStorage = getFromLocalStorage(StorageKey.Product);
  const findProduct = cartStorage.find((product: CartItem) => {
    return product.id === id;
  });

  if (findProduct.quantity < 1) {
    handleDeleteProduct(findProduct.id);
    findProduct.quantity;
  } else {
    findProduct.quantity += step;
    saveToLocalStorage(StorageKey.Product, cartStorage);
    renderProductCart(cartStorage);
  }
};

const addEventForDeleteBtn = () => {
  const deleteBtns = document.querySelectorAll<HTMLElement>('.product-cart-action .btn.btn-delete-outline');
  deleteBtns.forEach((btn) => {
    btn.addEventListener('click', () => handleDeleteProduct(parseInt(btn.dataset.id)));
  });
};

const addEventForChangeInput = () => {
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
    if (quantity < 1) {
      handleDeleteProduct(findProduct.id);
    } else {
      findProduct.quantity += quantity;
      saveToLocalStorage(StorageKey.Product, cartStorage);
      renderProductCart(cartStorage);
    }
  }
};

const handleDeleteProduct = (id: number) => {
  const cartStorage = getFromLocalStorage(StorageKey.Product);
  const findProduct = cartStorage.find((product: CartItem) => {
    return product.id === id;
  });
  console.log(findProduct);

  const isAcceptDelete = confirm('Do you want to delete this product?!!');
  if (isAcceptDelete) {
    const newData = cartStorage.filter((product: CartItem) => {
      return product.id !== id;
    });
    if (newData) {
      saveToLocalStorage(StorageKey.Product, newData);
      renderProductCart(newData);
    }
  } else {
    if (findProduct.quantity === 0) {
      findProduct.quantity += 1;
      saveToLocalStorage(StorageKey.Product, cartStorage);
      renderProductCart(cartStorage);
    }
  }
};

export default renderProductCart;
