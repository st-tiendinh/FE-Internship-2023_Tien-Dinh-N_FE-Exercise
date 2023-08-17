export enum ProductStatus {
  Available = 'Available',
  OutOfStock = 'Out of stock',
}

export interface ProductProps {
  id: number;
  name: string;
  discount: number;
  price: number;
  imageUrl: string;
  status: ProductStatus;
}
