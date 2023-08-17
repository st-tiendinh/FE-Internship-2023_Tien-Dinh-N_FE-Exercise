export interface ProductProps {
  id: number,
  name: string,
  discount: number,
  price: number,
  imageUrl: string,
  status: 'Available' | 'Out of stock'
}
