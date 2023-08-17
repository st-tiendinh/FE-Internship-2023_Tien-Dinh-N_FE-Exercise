import Product from './product.entity.js';
import { calcCartQuantity, calcDiscountPrice } from '../../utils/calculator.js';
import { getFromLocalStorage, saveToLocalStorage } from '../../services/localStorage.service.js';

const renderProductList = (productData: Product[]) => {
  const sections = document.querySelectorAll<HTMLElement>('.section.section-product .container');
  if (productData && productData.length) {
    renderCartItemCount();

    sections.forEach((section) => {
      section.innerHTML = `
        <ul class="product-list row">
          ${productData
            .map((product: Product) => {
              let { id, name, discount, imageUrl, price, status } = product;
              return `
              <li class="product-item col col-3 col-md-6 col-sm-6">
              <div class="product">
                <a class="product-link" href="">
                  <img src="${imageUrl}" alt="${name}" class="product-image" />
                  <div class="product-status"><span class="badge badge-outline-primary">${status}</span></div>
                  <span class="btn btn-primary" data-id='${id}'>Add to cart</span>
                  ${discount ? `<span class="badge badge-danger">${discount}%</span>` : ''}
                  <div class="product-description">
                    <h4 class="product-name">${name}</h4>
                    <div class="product-prices">
                      <span class="sale-price ${discount ? 'active' : ''}">$
                      ${calcDiscountPrice(price, discount)}
                      </span>
                      <span class="original-price">${discount ? '$' + price : ''}</span>
                    </div>
                  </div>
                </a>
              </div>
            </li>`;
            })
            .join('')}
        </ul>`;
    });

    // Prevent Default For Product Link
    preventDefaultProductLink();

    // Add Event For Add-To-Cart Button
    addEventForAddToCartBtn(productData);
  }
};

const renderCartItemCount = () => {
  let cartStorage = getFromLocalStorage('product');
  const cartPopups = document.querySelectorAll<HTMLElement>('.header-action-quantity');
  cartPopups.forEach(function (cartPopup) {
    if (calcCartQuantity(cartStorage)) {
      cartPopup.innerText = calcCartQuantity(cartStorage).toString();
      cartPopup.style.display = 'flex';
    } else {
      cartPopup.innerText = calcCartQuantity(cartStorage).toString();
      cartPopup.style.display = 'none';
    }
  });
};

const addEventForAddToCartBtn = (productData: Product[]) => {
  const productBtn = document.querySelectorAll<HTMLElement>('.product-item .product .product-link .btn.btn-primary');
  productBtn.forEach((p) => {
    p.addEventListener('click', (e) => {
      e.preventDefault();
      handleAddToCart(parseInt(p.dataset.id), productData);
    });
  });
};

const preventDefaultProductLink = () => {
  document
    .querySelectorAll('.product .product-link')
    .forEach((link) => link.addEventListener('click', (e) => e.preventDefault()));
};

const handleAddToCart = (id: number, productData: Product[]) => {
  let selectedProduct = productData.filter((item: Product) => {
    return id === item.id;
  })[0];
  if (selectedProduct.status === 'Out of stock') {
    return;
  }
  let cartStorage = getFromLocalStorage('product');
  let existedProduct = cartStorage.find((item: Product) => {
    return id === item.id;
  });
  if (existedProduct) {
    existedProduct.quantity += 1;
  } else {
    cartStorage.push({
      ...selectedProduct,
      quantity: 1,
    });
  }
  saveToLocalStorage('product', cartStorage);
  renderCartItemCount();
};

export default renderProductList;
