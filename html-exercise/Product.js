class Product {
  constructor(product) {
    const { id, name, discount, price, imageUrl } = product;
    this.id = id;
    this.name = name;
    this.discount = discount;
    this.price = price;
    this.imageUrl = imageUrl;
  }
}

export default Product;
