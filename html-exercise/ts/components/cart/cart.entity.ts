import { CartItemProps } from "./cart.interface.js";

class CartItem implements CartItemProps {
  id: number;
  name: string;
  discount: number;
  price: number;
  imageUrl: string;
  quantity: number;
}

export default CartItem;
