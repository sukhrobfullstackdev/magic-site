import { useEffect, useState } from 'react';
import { IS_CLIENT } from '../constants/environment-detection';

const useSessionStorage = <T>(key: string, initialValue?: T, raw?: boolean): [T, (value: T) => void] => {
  /**
   * Return initial value if the Client is not available
   */
  if (!IS_CLIENT) {
    return [initialValue as T, () => {}];
  }

  const [state, setState] = useState<T>(() => {
    try {
      const sessionStorageValue = sessionStorage.getItem(key);

      if (typeof sessionStorageValue !== 'string') {
        sessionStorage.setItem(key, raw ? String(initialValue) : JSON.stringify(initialValue));
        return initialValue;
      }

      return raw ? sessionStorageValue : JSON.parse(sessionStorageValue || 'null');
    } catch {
      /**
       * If user is in private mode or has storage restriction
       * sessionStorage can throw. JSON.parse and JSON.stringify can throw, too.
       */
      return initialValue;
    }
  });

  useEffect(() => {
    try {
      const serializedState = raw ? String(state) : JSON.stringify(state);
      sessionStorage.setItem(key, serializedState);
    } catch {
      /**
       * If user is in private mode or has storage restriction
       * sessionStorage can throw. Also JSON.stringify can throw.
       */
    }
  });

  return [state, setState];
};

export default useSessionStorage;
