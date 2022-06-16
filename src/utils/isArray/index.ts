import { ArrayType } from '../../types';

/**
 * Check whether variable is an Array []
 * @param variable variable to be checked
 * @returns Boolean whether variable is an Array
 */
export const isArray = (variable: any): variable is ArrayType => Array.isArray(variable);
