import { ProductProps } from "../product/product.interface.js";

export interface CartItemProps extends Omit<ProductProps, 'status'> {
  quantity: number;
}
