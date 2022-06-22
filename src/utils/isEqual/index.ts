import { isArray } from '../isArray';
import { isDate } from '../isDate';
import { isObject } from '../isObject';

/**
 * Tests whether A equals B.
 * Deep comparison between the two to check whether both are equal.
 * Checks strict equality and Object, Array, and Date equality.
 */
export const isEqual = (A: any, B: any): boolean => {
  if (A === B) {
    return true;
  }
  if (isArray(A) && isArray(B)) {
    return A.length === B.length
      && A.every((_el, index) => isEqual(A[index], B[index]));
  }
  if (isObject(A) && isObject(B)) {
    const keysA = Object.keys(A);
    const keysB = Object.keys(B);
    return keysA.length === keysB.length
      && keysA.every((key) => isEqual(A[key], B[key]));
  }
  if (isDate(A) && isDate(B)) {
    return Number(A) === Number(B);
  }
  return false;
};
