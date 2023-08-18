// import { CartItem } from '../components/cart/cart.entity.js';
// export const calcCartQuantity = (cartStorage: CartItem[]) => {
//   return cartStorage.reduce((sum: number, item: CartItem) => {
//     return sum + item.quantity;
//   }, 0);
// };
// export const calcProductAllTotalPrice = (cartStorage: CartItem[]) => {
//   return cartStorage
//     .reduce((sum: number, item: CartItem) => {
//       return sum + item.quantity * item.price;
//     }, 0)
//     .toFixed(2);
// };
// export const calcDiscountPrice = (originalPrice: number, discount: number) => {
//   let discountPrice = originalPrice;
//   discountPrice -= (discount * originalPrice) / 100;
//   return parseFloat(discountPrice.toFixed(2));
// };
// export const calcProductTotalPrice = (price: number, quantity: number) => {
//   return (price * quantity).toFixed(2);
// };
