import renderProductCart from './components/cart/cart.js';
import { getFromLocalStorage, StorageKey } from './services/localStorage.service.js';

renderProductCart(getFromLocalStorage(StorageKey.Product));
