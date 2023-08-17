import productData from './product-data.js';

const handleScrollHeader = () => {
  window.addEventListener('scroll', function () {
    if (window.scrollY > 90) {
      document.querySelector('.header').classList.add('header-sticky');
      document.querySelector('.logo-img').style.display = 'none';
      document.querySelector('.header-action-list').style.display = 'none';
      document.querySelector('.mobile-logo-img').style.display = 'block';
      document.querySelector('.header-mobile-action-list').style.display = 'flex';
    } else {
      document.querySelector('.header').classList.remove('header-sticky');
      document.querySelector('.logo-img').style.display = 'block';
      document.querySelector('.header-action-list').style.display = 'flex';
      document.querySelector('.mobile-logo-img').style.display = 'none';
      document.querySelector('.header-mobile-action-list').style.display = 'none';
    }
  });
};

const calcQuantity = () => {
  let cartStorage = JSON.parse(window.localStorage.getItem('product')) || [];
  return cartStorage.reduce((sum, item) => {
    return sum + item.quantity;
  }, 0);
};

const calcDiscountPrice = (originalPrice, discount) => {
  let discountPrice = originalPrice;
  discountPrice -= (discount * originalPrice) / 100;
  return discountPrice.toFixed(2);
};

const renderCartPopup = () => {
  const cartPopups = document.querySelectorAll('.header-action-quantity');
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

const renderProductList = () => {
  const sections = document.querySelectorAll('.section.section-product .container');
  if (productData && productData.length) {
    renderCartPopup();

    sections.forEach((section) => {
      section.innerHTML = `
        <ul class="product-list row">
          ${productData
            .map((product) => {
              return `
              <li class="product-item col col-3 col-md-6 col-sm-6">
              <div class="product">
                <a class="product-link" href="">
                  <span class="btn btn-primary" data-id='${product.id}'>Add to cart</span>
                  <img src="${product.imageUrl}" alt="${product.name}" class="product-image" />
                  ${product.discount ? `<span class="badge badge-danger">${product.discount}%</span>` : ''}
                  <div class="product-description">
                    <h4 class="product-name">${product.name}</h4>
                    <div class="product-prices">
                      <span class="sale-price ${product.discount ? 'active' : ''}">$
                      ${calcDiscountPrice(product.price, product.discount)}
                      </span>
                      <span class="original-price">${product.discount ? '$' + product.price : ''}</span>
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
    addEventForAddToCartBtn();
  }
};

function addEventForAddToCartBtn() {
  const productBtn = document.querySelectorAll('.product-item .product .product-link .btn.btn-primary');
  productBtn.forEach((p) => {
    p.addEventListener('click', (e) => {
      e.preventDefault();
      handleAddToCart(parseInt(p.dataset.id));
    });
  });
}

function preventDefaultProductLink() {
  document
    .querySelectorAll('.product .product-link')
    .forEach((link) => link.addEventListener('click', (e) => e.preventDefault()));
}

function handleAddToCart(id) {
  let selectedProduct = productData.find((item) => {
    return id === item.id;
  });
  let cartStorage = JSON.parse(window.localStorage.getItem('product')) || [];
  let existedProduct = cartStorage.find((item) => {
    return id === item.data.id;
  });
  if (existedProduct) {
    existedProduct.quantity += 1;
  } else {
    cartStorage.push({
      data: { ...selectedProduct },
      quantity: 1,
    });
  }
  localStorage.setItem('product', JSON.stringify(cartStorage));
  renderCartPopup();
}

handleScrollHeader();
renderProductList();
