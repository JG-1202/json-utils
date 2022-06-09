import { IArray, IObject } from '../../types';
import { isArray } from '../isArray';
import { isObject } from '../isObject';

/**
 * Check whether variable is an Array [] or an Object {}
 * @param variable variable to be checked
 * @returns true if variable is an Array or Object
 */
export const isJson = (variable: any): variable is IArray | IObject => (
  isArray(variable) || isObject(variable));
