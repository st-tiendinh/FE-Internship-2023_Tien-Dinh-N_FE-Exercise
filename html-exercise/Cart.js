import Product from './product.js';

class Cart extends Product {
  constructor(id, name, discount, price, imageUrl, quantity) {
    super(id, name, discount, price, imageUrl);
    this.quantity = quantity;
  }
}

export default Cart;
