import renderProductCart from './components/cart/cart.js';
import { getFromLocalStorage } from './services/localStorage.service.js';

renderProductCart(getFromLocalStorage('product'));
