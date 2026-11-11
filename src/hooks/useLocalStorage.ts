import { useState, useEffect } from 'react';

export function useLocalStorage<T>(key: string, initialValue: T): [T, (value: T) => void] {
  const [storedValue, setStoredValue] = useState<T>(() => {
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.error(`Error reading localStorage key "${key}":`, error);
      return initialValue;
    }
  });

  useEffect(() => {
    try {
      window.localStorage.setItem(key, JSON.stringify(storedValue));
    } catch (error) {
      console.error(`Error writing localStorage key "${key}":`, error);
      if (error instanceof DOMException && error.name === 'QuotaExceededError') {
        // ponytail: toast notification needs to be triggered from App level
        alert('Penyimpanan penuh. Hapus cover game lain atau gunakan gambar lebih kecil.');
      }
    }
  }, [key, storedValue]);

  return [storedValue, setStoredValue];
}
