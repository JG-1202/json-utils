import { IArray, IJson } from '../../types';
import { chopArray } from '../chopArray';
import { chopObject } from '../chopObject';
import { isObject } from '../isObject';

/**
 * Chop an Array into smaller pieces
 * @param toChop Array to be chopped
 * @param chopSize Maximum length of chopped element
 * @returns Array of chopped Arrays
 */
export const chop = <T extends IJson>(toChop: T, chopSize: number): T[] | Partial<T>[] => (
  isObject(toChop) ? chopObject(toChop, chopSize) : chopArray(toChop as IArray & T, chopSize));
