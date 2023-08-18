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

  calcDiscountPrice = (originalPrice: number, discount: number) => {
    let discountPrice = originalPrice;
    discountPrice -= (discount * originalPrice) / 100;
    return parseFloat(discountPrice.toFixed(2));
  };
  
  calcProductTotalPrice = (price: number, quantity: number) => {
    return parseFloat((price * quantity).toFixed(2));
  };
}

export default Product;
