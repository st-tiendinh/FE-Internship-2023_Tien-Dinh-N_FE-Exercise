import { ProductProps, ProductStatus } from './product.interface.js';
class Product implements ProductProps {
  id: number;
  name: string;
  discount: number;
  price: number;
  imageUrl: string;
  status: ProductStatus;

  constructor(props: ProductProps) {
    const { id, name, discount, price, imageUrl, status } = props;
    this.id = id;
    this.name = name;
    this.discount = discount;
    this.price = price;
    this.imageUrl = imageUrl;
    this.status = status;
  }
}

export default Product;
