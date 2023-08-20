import { CartItemProps, CartProps } from './cart.interface.js';

export class CartItem implements CartItemProps {
  id: number;
  name: string;
  discount: number;
  price: number;
  imageUrl: string;
  quantity: number;

  constructor(props: CartItemProps) {
    const { id, name, discount, price, imageUrl, quantity } = props;
    this.id = id;
    this.name = name;
    this.discount = discount;
    this.price = price;
    this.imageUrl = imageUrl;
    this.quantity = quantity;
  }

  calcDiscountPrice = (): number => {
    return parseFloat((this.price * (1 - this.discount / 100)).toFixed(2));
  };

  calcProductTotalPrice = (): number => {
    return parseFloat((this.price * (1 - this.discount / 100) * this.quantity).toFixed(2));
  };
}

export class Cart implements CartProps {
  cartItems: CartItemProps[];

  constructor(cartItems: CartItemProps[]) {
    this.cartItems = cartItems;
  }

  calcCartAllQuantity = (): number => {
    return this.cartItems.reduce((sum: number, item: CartItemProps) => {
      return sum + item.quantity;
    }, 0);
  };

  calcProductAllTotalPrice = (): number => {
    return parseFloat(
      this.cartItems
        .reduce((sum: number, item: CartItemProps) => {
          return sum + item.quantity * item.price * (1 - item.discount / 100);
        }, 0)
        .toFixed(2)
    );
  };
}
