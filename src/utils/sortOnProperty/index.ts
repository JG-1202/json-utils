import { ObjectType } from '../../types';
import { isArray } from '../isArray';

const typeToString = (variable: any): string => Object.prototype.toString.call(variable);

const getOrder = <T extends ObjectType>(
  a: T, b: T, key: keyof T, direction?: 1 | -1,
) => {
  const sortDirection = direction || 1;
  if (a[key] === b[key]) {
    return 0;
  }
  const typeStringA = typeToString(a[key]);
  const typeStringB = typeToString(b[key]);
  if (typeStringA !== typeStringB) {
    return (typeStringA > typeStringB) ? sortDirection : -sortDirection;
  }
  return (a[key] > b[key]) ? sortDirection : -sortDirection;
};

/**
 * Sort Array on properties.
 * Possible to sort on multiple keys.
 * When keys input is an Array, the input Array will be first sorted on
 * first element in keys, when input-element is equal it will be sorted on next keys-element.
 */
export const sortOnProperty = <T extends ObjectType> (
  input: T[], keys: keyof T | (keyof T)[], direction?: 1 | -1,
) => (input.sort((a, b) => {
    if (isArray(keys)) {
      let order = 0;
      keys.some((key) => {
        order = getOrder(a, b, key as keyof T, direction);
        return order !== 0;
      });
      return order;
    }
    return getOrder(a, b, keys as keyof T, direction);
  }));
