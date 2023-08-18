import renderProductCart from './components/cart/index.js';
import { getFromLocalStorage, StorageKey } from './services/localStorage.service.js';
renderProductCart(getFromLocalStorage(StorageKey.Product));
