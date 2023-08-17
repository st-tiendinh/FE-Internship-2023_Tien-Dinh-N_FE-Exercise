import Product from '../components/product/product.entity';

export const fetchProductData = async (
  url: string,
  callback?: (data: Array<Product>) => void
): Promise<Array<Product> | string> => {
  try {
    const response = await fetch(url);
    const data = await response.json();
    if (callback) {
      callback(data);
    }
    return data;
  } catch (error) {
    return error.message;
  }
};
