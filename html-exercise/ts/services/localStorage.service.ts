export enum StorageKey {
  Product = 'product',
}

export function saveToLocalStorage(key: StorageKey, data: any) {
  localStorage.setItem(key, JSON.stringify(data));
}

export function getFromLocalStorage(key: StorageKey): any {
  const data = localStorage.getItem(key);
  return data ? JSON.parse(data) : [];
}
