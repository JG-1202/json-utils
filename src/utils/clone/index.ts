import { isArray } from '../isArray';
import { isJson } from '../isJson';

/**
 * Copies elements from Json ({} or []) recursively
 * @param inputVariable
 * @returns Copied Json
 */
export const clone = <T extends any>(inputVariable: T): T => {
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
