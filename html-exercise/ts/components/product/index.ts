import Product from './product.entity.js';
import { getFromLocalStorage, saveToLocalStorage, StorageKey } from '../../services/localStorage.service.js';
import { fetchProductData } from '../../api/apiCall.js';
import { endpoint } from '../../api/apiUrls.js';
import { ProductStatus } from './product.interface.js';
import { Cart, CartItem } from '../cart/cart.entity.js';

const renderProductList = async () => {
  const sections = document.querySelectorAll<HTMLElement>('.section.section-product .container');
  const productData = await fetchProductData(endpoint.products);

  if (productData && productData.length) {
    renderCartItemCount();

    sections.forEach((section) => {
      section.innerHTML = `
        <ul class="product-list row">
          ${productData
            .map((product: Product) => {
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
                      ${productEntity.calcDiscountPrice()}
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
  const cartEntity = new Cart(getFromLocalStorage<CartItem[]>(StorageKey.Product, []));
  const cartPopups = document.querySelectorAll<HTMLElement>('.header-action-quantity');
  cartPopups.forEach(function (cartPopup) {
    cartPopup.innerText = cartEntity.calcCartAllQuantity().toString() || '';
    if (cartEntity.calcCartAllQuantity()) {
      cartPopup.style.display = 'flex';
    } else {
      cartPopup.style.display = 'none';
    }
  });
};

const addEventForAddToCartBtn = (productData: Product[]) => {
  const productBtnCollection = document.querySelectorAll<HTMLElement>(
    '.product-item .product .product-link .btn.btn-primary'
  );
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

const handleAddToCart = (id: number, productData: Product[]) => {
  const selectedProduct = productData.find((item: Product) => {
    return id === item.id;
  });

  if (selectedProduct.status !== ProductStatus.OUT_OF_STOCK) {
    const cartStorage = getFromLocalStorage<any>(StorageKey.Product, []);
    const existedProduct = cartStorage.find((item: CartItem) => {
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
    saveToLocalStorage<any>(StorageKey.Product, cartStorage);
    renderCartItemCount();
  }
};

export default renderProductList;
