import Product from './product.entity.js';
import CartItem from '../cart/cart.entity.js';
import { ProductProps } from './product.interface.js';
// var data = [
//   {
//     id: 1,
//     name: 'T-Shirt Summer Vibes',
//     discount: 30,
//     price: 119.99,
//     imageUrl: './assets/images/product-1.png',
//     status: 'Available'
//   },
//   {
//     id: 2,
//     name: 'T-Shirt Summer Vibes',
//     discount: 0,
//     price: 119.99,
//     imageUrl: './assets/images/product-2.png',
//     status: 'Available'
//   },
//   {
//     id: 3,
//     name: 'T-Shirt Summer Vibes',
//     discount: 0,
//     price: 79.99,
//     imageUrl: './assets/images/product-3.png',
//     status: 'Out of stock'
//   },
//   {
//     id: 4,
//     name: 'T-Shirt Summer Vibes',
//     discount: 0,
//     price: 119.99,
//     imageUrl: './assets/images/product-4.png',
//     status: 'Out of stock'
//   },
// ];




// export const productData = data.map((item: ProductProps) => new Product(item));

const calcQuantity = () => {
  let cartStorage = JSON.parse(window.localStorage.getItem('product')) || [];
  return cartStorage.reduce((sum: number, item: CartItem) => {
    return sum + item.quantity;
  }, 0);
};

export const calcDiscountPrice = (originalPrice: number, discount: number) => {
  let discountPrice = originalPrice;
  discountPrice -= (discount * originalPrice) / 100;
  return parseFloat(discountPrice.toFixed(2));
};

const renderCartPopup = () => {
  const cartPopups = document.querySelectorAll<HTMLElement>('.header-action-quantity');
  cartPopups.forEach(function (cartPopup) {
    if (calcQuantity()) {
      cartPopup.innerText = calcQuantity();
      cartPopup.style.display = 'flex';
    } else {
      cartPopup.innerText = calcQuantity();
      cartPopup.style.display = 'none';
    }
  });
};

const renderProductList = (productData: Product[]) => {
  const sections = document.querySelectorAll<HTMLElement>('.section.section-product .container');
  if (productData && productData.length) {
    renderCartPopup();

    sections.forEach((section) => {
      section.innerHTML = `
        <ul class="product-list row">
          ${productData
          .map((product: Product) => {
            let { id, name, discount, imageUrl, price, status } = product
            return `
              <li class="product-item col col-3 col-md-6 col-sm-6">
              <div class="product">
                <a class="product-link" href="">
                  <div class="product-status"><span class="badge badge-outline-primary">${status}</span></div>
                  <span class="btn btn-primary" data-id='${id}'>Add to cart</span>
                  <img src="${imageUrl}" alt="${name}" class="product-image" />
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

    // Add Event For Add To Cart Button
    addEventForAddToCartBtn(productData);
  }
};

function addEventForAddToCartBtn(productData: Product[]) {
  const productBtn = document.querySelectorAll<HTMLElement>('.product-item .product .product-link .btn.btn-primary');
  productBtn.forEach((p) => {
    p.addEventListener('click', (e) => {
      e.preventDefault();
      handleAddToCart(parseInt(p.dataset.id), productData);
    });
  });
}

function preventDefaultProductLink() {
  document
    .querySelectorAll('.product .product-link')
    .forEach((link) => link.addEventListener('click', (e) => e.preventDefault()));
}

function handleAddToCart(id: number, productData: any[]) {
  let selectedProduct = productData.filter((item: Product) => {
    return id === item.id;
  })[0];
  if (selectedProduct.status === 'Out of stock') {
    return;
  }
  let cartStorage = JSON.parse(localStorage.getItem('product')) || [];
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
  localStorage.setItem('product', JSON.stringify(cartStorage));
  renderCartPopup();
}

export default renderProductList;
