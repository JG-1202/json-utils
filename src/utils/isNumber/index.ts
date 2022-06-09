import { isArray } from '../isArray';

/**
 * Check whether variable is a number
 * @param variable variable to be checked
 * @returns Boolean whether variable is a number
 */
export const isNumber = (variable: any): variable is number | string => (
  variable === 0
    || (
      !!variable
      && !isArray(variable)
      // eslint-disable-next-line no-prototype-builtins
      && !Date.prototype.isPrototypeOf(variable)
      && !Number.isNaN(Number(variable)))
);
