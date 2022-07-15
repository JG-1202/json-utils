import { ObjectType } from '../../types';

/**
 * Check whether variable is an Object {}
 * @param variable variable to be checked
 * @returns Boolean whether variable is an Object
 */
export const isObject = (variable: any): variable is ObjectType => {
  if (Object.prototype.toString.call(variable) !== '[object Object]') {
    return false;
  }
  const prototype = Object.getPrototypeOf(variable);
  if (!prototype) {
    return false;
  }
  const { constructor } = prototype;
  return !constructor || constructor instanceof constructor;
};
