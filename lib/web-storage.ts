import { IS_CLIENT } from 'constants/environment-detection';

/**
 * Prevent server-side localStorage is undefined error
 */
export const storage = IS_CLIENT
  ? localStorage
  : {
      getItem: () => {},
      setItem: () => {},
    };
