import { IJson } from '../../types';
import { isArray } from '../isArray';
import { isObject } from '../isObject';

/**
 * Check whether variable is an Array [] or an Object {}
 * @param variable variable to be checked
 * @returns true if variable is an Array or Object
 */
export const isJson = (variable: any): variable is IJson => (
  isArray(variable) || isObject(variable));
