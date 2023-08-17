import handleScrollHeader from "./components/header/header.js";
import renderProductList from "./components/product/product.js";
import { api as url } from "./api/apiUrls.js";
import { fetchProductData } from "./api/apiCall.js";
handleScrollHeader();
fetchProductData(url, renderProductList);
