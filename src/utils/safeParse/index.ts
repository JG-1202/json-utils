import { FailureCallbackFunction, IJson } from '../../types';
import { isJson } from '../isJson';

type U = any;

export const safeParse = <
T extends any,
V extends FailureCallbackFunction<U> | undefined = undefined>(
    inputVariable: T,
    callbackOnFailure?: V,
  ):
  V extends FailureCallbackFunction<U> ? U : T | IJson => {
  if (typeof inputVariable === 'string') {
    try {
      const parsed = JSON.parse(inputVariable);
      return isJson(parsed) ? parsed : inputVariable;
    } catch (error) {
      return callbackOnFailure ? callbackOnFailure(error, inputVariable) : inputVariable;
    }
  }
  return inputVariable;
};
