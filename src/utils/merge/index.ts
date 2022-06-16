import { ArrayType, ObjectType } from '../../types';
import { clone } from '../clone';
import { isArray } from '../isArray';
import { isObject } from '../isObject';

type Merged<T> = (
  T extends unknown ? (key: T) => void : never
) extends (key: infer U) => void ? U : never;

const mergeArrays = <T extends ArrayType> (...arrays: T[]): T => (
  Array.prototype.concat.apply([], arrays)
) as T;

/**
 * Deep merges elements, while returning type based on input.
 * Objects and Arrays are merged, conflicting types will be overwritten.
 * Overwriting and merging based on the order of provided arguments,
 * later elements will overwrite earlier elements.
 * @returns Merged JSON.
 */
export const merge = <T extends ArrayType[] | ObjectType[]>(
  ...elements: T
): Merged<T[number]> => {
  let merged: any;
  elements.forEach((element) => {
    if (isArray(merged) && isArray(element)) {
      merged = mergeArrays(merged, element);
    } else if (isObject(merged) && isObject(element)) {
      Object.entries(element).forEach((entry) => {
        const [key, value] = entry;
        merged[key] = merge(merged[key], value);
      });
    } else {
      merged = clone(element);
    }
  });
  return merged;
};
