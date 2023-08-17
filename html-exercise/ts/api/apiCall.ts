import Product from "../components/product/product.entity";

export const fetchProductData = async (url: string, callback: any): Promise<Array<Product>> => {
  try {
    const response = await fetch(url)
    const data = await response.json()
    callback(data);
    return data
  } catch (error) {
    return error.message
  }
}
