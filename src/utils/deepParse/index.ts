import { isObject } from '../isObject';
import { safeParse } from '../safeParse';
import { isArray } from '../isArray';
import { IJson } from '../../types';

/**
 * Parses input recursively
 * Attempts to parse any element that it encounters while recursively looping over elements
 * When parsed element is not a JSON ({} or []), the original element will be preserved.
 * @returns parsed input
 */
export const deepParse = <T extends any>(variable: T): T | IJson => {
  const element = safeParse(variable);
  if (isArray(element)) {
    element.forEach((_arrayElement, index) => {
      element[index] = deepParse(element[index]);
    });
  } else if (isObject(element)) {
    Object.keys(element).forEach((key) => {
      element[key] = deepParse(element[key]);
    });
  }
  return element;
};
