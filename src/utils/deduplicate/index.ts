import { ArrayType } from '../../types';
import { isEqual } from '../isEqual';

/**
 * Dedpucliates input. Input may be any Array.
 * It dedpulcites based on a deep comparison between the elements to check whether equals are found.
 * Looks for strict equality and Object, Array, and Date equality.
 */
export const deduplicate = <T extends ArrayType> (input: T): T[number][] => {
  const deduplicated: T[number][] = [];
  input.forEach((element) => {
    const exists = deduplicated.find((value) => isEqual(element, value));
    if (!exists) {
      deduplicated.push(element);
    }
  });
  return deduplicated;
};
