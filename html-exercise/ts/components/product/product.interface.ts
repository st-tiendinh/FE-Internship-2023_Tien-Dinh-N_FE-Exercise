export enum ProductStatus {
  OutOfStock,
  Available,
}

export interface ProductProps {
  id: number;
  name: string;
  discount: number;
  price: number;
  imageUrl: string;
  status: ProductStatus;

  calcDiscountPrice: (originalPrice: number, discount: number) => number;
  calcProductTotalPrice: (price: number, quantity: number) => number;
}
