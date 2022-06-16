import { ObjectType } from '../../types';

/**
 * Chop an Object into smaller pieces
 * @param toChop Object to be chopped
 * @param chopSize Maximum number of properties within chopped element
 * @returns Array of chopped Objects
 */
export const chopObject = <T extends ObjectType>(toChop: T, chopSize: number): Partial<T>[] => {
  const result = [];
  const entries = Object.entries(toChop);
  for (let i = 0; i < entries.length; i += chopSize) {
    const objectEntries = entries.slice(i, i + chopSize);
    result.push(Object.fromEntries(objectEntries) as Partial<T>);
  }
  return result;
};
