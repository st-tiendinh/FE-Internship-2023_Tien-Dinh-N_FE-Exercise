import handleScrollHeader from "./header/header.js";
import renderProductList from "./product/product.js";
import Product from "./product/product.entity.js";
import { api as url } from "./constant.js";

const fetchProductData = async (url: string): Promise<Array<Product> | string> => {
  try {
    const response = await fetch(url)
    const data = await response.json()
    renderProductList(data);
    return data
  } catch (error) {
    if (error) {
      return error.message
    }
  }
}

fetchProductData(url)
handleScrollHeader();
