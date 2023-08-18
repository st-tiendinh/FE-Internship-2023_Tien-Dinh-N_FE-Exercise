var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import Product from './product.entity.js';
import { getFromLocalStorage, saveToLocalStorage, StorageKey } from '../../services/localStorage.service.js';
import { fetchProductData } from '../../api/apiCall.js';
import { endpoint } from '../../api/apiUrls.js';
import { ProductStatus } from './product.interface.js';
import { Cart } from '../cart/cart.entity.js';
const renderProductList = () => __awaiter(void 0, void 0, void 0, function* () {
    const sections = document.querySelectorAll('.section.section-product .container');
    const productData = yield fetchProductData(endpoint.products);
    if (productData && productData.length) {
        renderCartItemCount();
        sections.forEach((section) => {
            section.innerHTML = `
        <ul class="product-list row">
          ${productData
                .map((product) => {
                const productEntity = new Product(product);
                const { id, name, discount, imageUrl, price, status } = productEntity;
                return `
              <li class="product-item col col-3 col-md-6 col-sm-6">
              <div class="product">
                <a class="product-link" href="">
                  <img src="${imageUrl}" alt="${name}" class="product-image" />
                  <div class="product-status">
                    <span class="badge badge-outline-primary">${status ? 'Available' : 'Out of Stock'}</span>
                  </div>
                  <button class="btn btn-primary" ${status ? '' : 'disabled'} data-id='${id}'>Add to cart</button>
                  ${discount ? `<span class="badge badge-danger">${discount}%</span>` : ''}
                  <div class="product-description">
                    <h4 class="product-name">${name}</h4>
                    <div class="product-prices">
                      <span class="sale-price ${discount ? 'active' : ''}">$
                      ${productEntity.calcDiscountPrice(price, discount)}
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
});
const renderCartItemCount = () => {
    const cartStorage = getFromLocalStorage(StorageKey.Product);
    const cartEntity = new Cart(cartStorage);
    const cartPopups = document.querySelectorAll('.header-action-quantity');
    cartPopups.forEach(function (cartPopup) {
        cartPopup.innerText = cartEntity.calcCartQuantity(cartStorage).toString() || '';
        if (cartEntity.calcCartQuantity(cartStorage)) {
            cartPopup.style.display = 'flex';
        }
        else {
            cartPopup.style.display = 'none';
        }
    });
};
const addEventForAddToCartBtn = (productData) => {
    const productBtnCollection = document.querySelectorAll('.product-item .product .product-link .btn.btn-primary');
    productBtnCollection.forEach((productBtn) => {
        productBtn.addEventListener('click', (e) => {
            e.preventDefault();
            handleAddToCart(parseInt(productBtn.dataset.id), productData);
        });
    });
};
const preventDefaultProductLink = () => {
    document
        .querySelectorAll('.product .product-link')
        .forEach((link) => link.addEventListener('click', (e) => e.preventDefault()));
};
const handleAddToCart = (id, productData) => {
    const selectedProduct = productData.find((item) => {
        return id === item.id;
    });
    if (selectedProduct.status !== ProductStatus.OutOfStock) {
        const cartStorage = getFromLocalStorage(StorageKey.Product);
        const existedProduct = cartStorage.find((item) => {
            return id === item.id;
        });
        if (existedProduct) {
            existedProduct.quantity += 1;
        }
        else {
            cartStorage.push(Object.assign(Object.assign({}, selectedProduct), { quantity: 1 }));
        }
        saveToLocalStorage(StorageKey.Product, cartStorage);
        renderCartItemCount();
    }
};
export default renderProductList;
