import { ArrayType } from '../../types';

/**
 * Chop an Array into smaller pieces
 * @param toChop Array to be chopped
 * @param chopSize Maximum length of chopped element
 * @returns Array of chopped Arrays
 */
export const chopArray = <T extends ArrayType>(toChop: T, chopSize: number): T[] => {
  const result:T[] = [];
  for (let i = 0; i < toChop.length; i += chopSize) {
    result.push(toChop.slice(i, i + chopSize) as T);
  }
  return result;
};
