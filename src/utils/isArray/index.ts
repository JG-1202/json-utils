import { IArray } from '../../types';

/**
 * Check whether variable is an Array []
 * @param variable variable to be checked
 * @returns Boolean whether variable is an Array
 */
export const isArray = (variable: any): variable is IArray => Array.isArray(variable);
