import { isObject } from '../isObject';
import { safeParse } from '../safeParse';
import { isArray } from '../isArray';
import { IArray, IObject } from '../../types';

/**
 * Parses input recursively
 * Attempts to parse any string that it encounters while recursively looping over elements
 * @param variable
 * @returns parsed input
 */
export const deepParse = <T extends any>(variable: T): T | IArray | IObject | number => {
  const element = typeof variable === 'string' ? safeParse(variable, () => variable) : variable;
  if (isObject(element)) {
    Object.keys(element).forEach((key) => {
      element[key] = deepParse(element[key]);
    });
  } else if (isArray(element)) {
    element.forEach((_arrayElement, index) => {
      element[index] = deepParse(element[index]);
    });
  }
  return element;
};
