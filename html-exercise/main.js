var productData = [
  {
    id: 1,
    name: 'T-Shirt Summer Vibes',
    discount: 30,
    price: 119.99,
    imageUrl: './assets/images/product-1.png',
  },
  {
    id: 2,
    name: 'T-Shirt Summer Vibes',
    discount: 0,
    price: 119.99,
    imageUrl: './assets/images/product-2.png',
  },
  {
    id: 3,
    name: 'T-Shirt Summer Vibes',
    discount: 0,
    price: 79.99,
    imageUrl: './assets/images/product-3.png',
  },
  {
    id: 4,
    name: 'T-Shirt Summer Vibes',
    discount: 0,
    price: 119.99,
    imageUrl: './assets/images/product-4.png',
  },
];

function handleScrollHeader() {
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
}

function calcQuantity() {
  var cartStorage = JSON.parse(window.localStorage.getItem('product')) || [];
  return cartStorage.reduce((sum, item) => {
    return sum + item.quantity;
  }, 0);
}

function calcDiscountPrice(originalPrice, discount) {
  var discountPrice = originalPrice;
  discountPrice -= (discount * originalPrice) / 100;
  return discountPrice.toFixed(2);
}

function renderCartPopup() {
  var cartPopups = document.querySelectorAll('.header-action-quantity');
  cartPopups.forEach(function (cartPopup) {
    if (calcQuantity()) {
      cartPopup.innerText = calcQuantity();
      cartPopup.style.display = 'flex';
    } else {
      cartPopup.innerText = calcQuantity();
      cartPopup.style.display = 'none';
    }
  });
}

// function renderProductList() {
//   var section = document.querySelectorAll('.section.section-product .container');
//   if (productData.length) {
//     section.forEach(function (sec) {
//   var productList = document.createElement('ul');
//   productList.className = 'product-list row';

//   productData.forEach(function (product) {
//     var productItem = document.createElement('li');
//     productItem.className = 'product-item col col-3 col-md-6 col-sm-6';
//     var productCard = document.createElement('div');
//     productCard.className = 'product';
//     var productLink = document.createElement('a');
//     productLink.href = '#';
//     productLink.className = 'product-link';

//     var productAddBtn = document.createElement('span');
//     productAddBtn.className = 'btn btn-primary';
//     productAddBtn.innerText = 'Add to cart';

//     var productBadge = document.createElement('span');
//     productBadge.className = 'badge badge-danger';
//     productBadge.innerText = product.discount + '%';

//     var productImg = document.createElement('img');
//     productImg.className = 'product-image';
//     productImg.src = product.imageUrl;
//     productImg.alt = product.name;

//     var productDesc = document.createElement('div');
//     productDesc.className = 'product-description';
//     var productName = document.createElement('div');
//     productName.className = 'product-name';
//     productName.innerText = product.name;

//     var productPrices = document.createElement('div');
//     productPrices.className = 'product-prices';

//     var salePrice = document.createElement('span');
//     product.discount ? (salePrice.className = 'sale-price active') : (salePrice.className = 'sale-price');
//     salePrice.innerText = '$' + calcDiscountPrice(product.price, product.discount);

//     var originalPrice = document.createElement('span');
//     originalPrice.className = 'original-price';
//     originalPrice.innerText = '$' + product.price;

//     product.discount ? productPrices.append(salePrice, originalPrice) : productPrices.append(salePrice);
//     productDesc.append(productName, productPrices);

//     product.discount
//       ? productLink.append(productBadge, productAddBtn, productImg, productDesc)
//       : productLink.append(productAddBtn, productImg, productDesc);

//     productCard.appendChild(productLink);
//     productItem.appendChild(productCard);
//     productList.appendChild(productItem);

//     productLink.addEventListener('click', function (event) {
//       event.preventDefault();
//     });

//     function handleAddToCart() {
//       var selectedProduct = productData.find(function (item) {
//         return product.id === item.id;
//       });
//       var cartStorage = JSON.parse(window.localStorage.getItem('product')) || [];
//       var existedProduct = cartStorage.find(function (item) {
//         return product.id === item.data.id;
//       });
//       if (existedProduct) {
//         existedProduct.quantity += 1;
//       } else {
//         cartStorage.push({
//           data: JSON.parse(JSON.stringify(selectedProduct)),
//           quantity: 1,
//         });
//       }
//       window.localStorage.setItem('product', JSON.stringify(cartStorage));
//       renderCartPopup();
//     }
//     productLink.addEventListener('click', handleAddToCart);
//   });
//   sec.appendChild(productList);
//     });

//     renderCartPopup();
//   }
// }

function renderProductList() {
  const section = document.querySelectorAll('.section.section-product .container');
  if (productData.length) {
    renderCartPopup();
    const productList = `
    <ul class="product-list row">
      ${productData
        .map((product) => {
          return `
          <li class="product-item col col-3 col-md-6 col-sm-6">
          <div class="product">
            <a class="product-link" href="">
              <img src="${product.imageUrl}" alt="${product.name}" class="product-image" />
              ${product.discount ? `<span class="badge badge-danger">${product.discount}%</span>` : ''}
              <div class="product-description">
                <h4 class="product-name">${product.name}</h4>
                <div class="product-prices">
                  <span class="sale-price ${product.discount ? 'active' : ''}">
                  ${calcDiscountPrice(product.price, product.discount)}
                  </span>
                  <span class="original-price">${product.discount ? product.price : ''}</span>
                </div>
              </div>
            </a>
          </div>
        </li>
        `;
        })
        .join('')}
    </ul>
    `;

    section.forEach((sec) => {
      return (sec.innerHTML += productList);
    });
  }
}

handleScrollHeader();
renderProductList();
