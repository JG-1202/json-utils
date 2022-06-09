import { IArray, IObject } from '../../types';
import { isArray } from '../isArray';
import { isObject } from '../isObject';

export const isJson = (variable: any): variable is IArray | IObject => (
  isArray(variable) || isObject(variable));
