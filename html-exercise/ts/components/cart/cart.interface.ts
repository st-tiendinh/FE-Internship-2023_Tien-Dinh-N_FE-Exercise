import { ProductProps } from '../product/product.interface.js';

export enum StepEnum {
  INCREASE = 1,
  DECREASE = -1,
}

export interface CartItemProps extends Omit<ProductProps, 'status'> {
  quantity: number;
  calcDiscountPrice: (originalPrice: number, discount: number) => number;
}

export interface CartProps {
  cartItems: CartItemProps[];
  calcCartQuantity: (cartStorage: CartItemProps[]) => number;
  calcProductAllTotalPrice: (cartStorage: CartItemProps[]) => number;
}
