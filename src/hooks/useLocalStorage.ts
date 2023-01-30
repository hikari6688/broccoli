import { useState } from 'react';

function useLocalStorage<T>(key: string) {
  const [state, setState] = useState<T | null>();

  function getStorage(): T | null {
    const moment = new Date().getTime();
    const { expire, value } = JSON.parse(localStorage.getItem(key) as string);
    if (expire && moment > expire) {
      localStorage.removeItem(key);
      setState(null);
      return null;
    }
    setState(value);
    return state as T;
  }

  function setStorage(value: T, expire?: number) {
    setState(value);
    localStorage.setItem(
      key,
      JSON.stringify({
        expire,
        value: JSON.stringify(value),
      }),
    );
  }

  function removeStorage() {
    localStorage.removeItem(key);
  }

  const storage = getStorage();

  return [storage, setStorage, removeStorage] as const;
}

export default useLocalStorage;
