import { ObjectType } from '../../types';

/**
 * Check whether variable is an Object {}
 * @param variable variable to be checked
 * @returns Boolean whether variable is an Object
 */
export const isObject = (variable: any): variable is ObjectType => (
  Object.prototype.toString.call(variable) === '[object Object]');
