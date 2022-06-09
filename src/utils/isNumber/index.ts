import { isArray } from '../isArray';

export const isNumber = (variable: any): variable is number | string => (
  variable === 0
    || (
      !!variable
      && !isArray(variable)
      // eslint-disable-next-line no-prototype-builtins
      && !Date.prototype.isPrototypeOf(variable)
      && !Number.isNaN(Number(variable)))
);
