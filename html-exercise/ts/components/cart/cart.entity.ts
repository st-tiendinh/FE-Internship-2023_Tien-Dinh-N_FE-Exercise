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

  calcDiscountPrice = (originalPrice: number, discount: number) => {
    let discountPrice = originalPrice;
    discountPrice -= (discount * originalPrice) / 100;
    return parseFloat(discountPrice.toFixed(2));
  };
  
  calcProductTotalPrice = (price: number, quantity: number) => {
    return parseFloat((price * quantity).toFixed(2));
  };
}

export class Cart implements CartProps {
  cartItems: CartItemProps[];

  constructor(cartItems: CartItemProps[]) {
    this.cartItems = cartItems;
  }
  calcCartQuantity = (cartStorage: CartItemProps[]) => {
    return cartStorage.reduce((sum: number, item: CartItemProps) => {
      return sum + item.quantity;
    }, 0);
  };

  calcProductAllTotalPrice = (cartStorage: CartItemProps[]) => {
    return parseFloat(
      cartStorage
        .reduce((sum: number, item: CartItemProps) => {
          return sum + item.quantity * item.price;
        }, 0)
        .toFixed(2)
    );
  };
}
