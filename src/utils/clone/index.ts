import { isArray } from '../isArray';
import { isDate } from '../isDate';
import { isJson } from '../isJson';

/**
 * Copies elements from Json ({} or []) recursively
 * Copies Objects, Arrays and Dates.
 * @param inputVariable
 * @returns Copied Json
 */
export const clone = <T extends any>(inputVariable: T): T => {
  if (isDate(inputVariable)) {
    return new Date(inputVariable) as T;
  }
  if (!isJson(inputVariable)) {
    return inputVariable;
  }
  if (isArray(inputVariable)) {
    return [...inputVariable].map((element) => clone(element)) as T;
  }
  return Object.fromEntries(Object.entries({ ...inputVariable }).map(
    (entry) => [entry[0], clone(entry[1])],
  )) as T;
};
