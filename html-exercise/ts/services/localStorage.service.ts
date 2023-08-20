export enum StorageKey {
  Product = 'product',
}

export function saveToLocalStorage<T>(key: StorageKey, data: T) {
  localStorage.setItem(key, JSON.stringify(data));
}

export function getFromLocalStorage<T>(key: StorageKey, defaultValue: T): T {
  const data = localStorage.getItem(key);
  return data ? JSON.parse(data) : defaultValue;
}
