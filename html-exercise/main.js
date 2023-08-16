const productData = [
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

function calcQuantity() {
  let cartStorage = JSON.parse(window.localStorage.getItem('product')) || [];
  return cartStorage.reduce((sum, item) => {
    return sum + item.quantity;
  }, 0);
}

const cartPopups = document.querySelectorAll('.header-action-quantity');

cartPopups.forEach(function (cartPopup) {
  cartPopup.innerText = calcQuantity();
});

const section = document.querySelectorAll('.section.section-product .container');
if (productData.length) {
  section.forEach(function (sec) {
    const productList = document.createElement('ul');
    productList.className = 'product-list row';

    productData.forEach(function (product) {
      const productItem = document.createElement('li');
      productItem.className = 'product-item col col-3 col-md-6 col-sm-6';
      const productCard = document.createElement('div');
      productCard.className = 'product';
      const productLink = document.createElement('a');
      productLink.href = '#';
      productLink.className = 'product-link';

      const productAddBtn = document.createElement('span');
      productAddBtn.className = 'btn btn-primary';
      productAddBtn.innerText = 'Add to cart';

      const productBadge = document.createElement('span');
      productBadge.className = 'badge badge-danger';
      productBadge.innerText = product.discount + '%';

      const productImg = document.createElement('img');
      productImg.className = 'product-image';
      productImg.src = product.imageUrl;
      productImg.alt = product.name;

      const productDesc = document.createElement('div');
      productDesc.className = 'product-description';
      const productName = document.createElement('div');
      productName.className = 'product-name';
      productName.innerText = product.name;

      const productPrices = document.createElement('div');
      productPrices.className = 'product-prices';

      const salePrice = document.createElement('span');
      product.discount ? (salePrice.className = 'sale-price active') : (salePrice.className = 'sale-price');
      salePrice.innerText = '$' + product.price;

      const originalPrice = document.createElement('span');
      originalPrice.className = 'original-price';
      originalPrice.innerText = '$' + product.price;

      product.discount ? productPrices.append(salePrice, originalPrice) : productPrices.append(salePrice);
      productDesc.append(productName, productPrices);

      product.discount
        ? productLink.append(productBadge, productAddBtn, productImg, productDesc)
        : productLink.append(productAddBtn, productImg, productDesc);

      productCard.appendChild(productLink);
      productItem.appendChild(productCard);
      productList.appendChild(productItem);

      productLink.addEventListener('click', function (event) {
        event.preventDefault();
      });

      function handleAddToCart() {
        let selectedProduct = productData.find(function (item) {
          return product.id === item.id;
        });

        let cartStorage = JSON.parse(window.localStorage.getItem('product')) || [];

        let existedProduct = cartStorage.find(function (item) {
          return product.id === item.data.id;
        });

        if (existedProduct) {
          existedProduct.quantity += 1;
        } else {
          cartStorage.push({
            data: JSON.parse(JSON.stringify(selectedProduct)),
            quantity: 1,
          });
        }

        window.localStorage.setItem('product', JSON.stringify(cartStorage));

        cartPopups.forEach(function (cartPopup) {
          cartPopup.innerText = calcQuantity();
        });
      }

      productLink.addEventListener('click', handleAddToCart);
    });

    sec.appendChild(productList);
  });
}
