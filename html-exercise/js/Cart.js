class Cart {
  constructor(cart) {
    const { id, name, discount, price, imageUrl, quantity } = cart;
    this.id = id;
    this.name = name;
    this.discount = discount;
    this.price = price;
    this.imageUrl = imageUrl;
    this.quantity = quantity;
  }
}

export default Cart;
