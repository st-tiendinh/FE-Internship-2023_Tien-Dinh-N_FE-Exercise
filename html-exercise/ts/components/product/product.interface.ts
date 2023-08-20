export enum ProductStatus {
  OUT_OF_STOCK,
  AVAILABLE,
}

export interface ProductProps {
  id: number;
  name: string;
  discount: number;
  price: number;
  imageUrl: string;
  status: ProductStatus;

  calcDiscountPrice: (originalPrice: number, discount: number) => number;
}
