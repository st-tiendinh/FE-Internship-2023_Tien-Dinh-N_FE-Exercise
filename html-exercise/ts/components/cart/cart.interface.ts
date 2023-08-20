import { ProductProps } from '../product/product.interface.js';

export enum StepEnum {
  INCREASE = 1,
  DECREASE = -1,
}

export interface CartItemProps extends Omit<ProductProps, 'status'> {
  quantity: number;
  calcProductTotalPrice(): number;
}

export interface CartProps {
  cartItems: CartItemProps[];

  calcCartAllQuantity: () => number;
  calcProductAllTotalPrice: () => number;
}
