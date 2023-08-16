import Product from './product.js';

class Cart extends Product {
  constructor(cart) {
    const { id, name, discount, price, imageUrl, quantity } = cart;
    super(id, name, discount, price, imageUrl);
    this.quantity = quantity;
  }
}

export default Cart;
