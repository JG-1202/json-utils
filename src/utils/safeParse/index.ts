import { FailureCallbackFunction, IJson } from '../../types';
import { isJson } from '../isJson';

const returnValue = <
T extends any,
U extends any,
V extends FailureCallbackFunction<U> | undefined = undefined>(
    error: any, inputVariable: T, callbackOnFailure?: V,
  ): V extends undefined ? T | IJson : U | IJson => (
    callbackOnFailure ? callbackOnFailure(error, inputVariable) : inputVariable as any);

/**
 * Attempts to parse input to JSON
 * When parsed element is not a JSON ({} or []), the original element will be returned.
 * @param inputVariable to be parsed
 * @param callbackOnFailure callback function which will be called
 * @returns Original element / Outcome of callbackOnFailure
 * (when not parsable to JSON) or (parsed) JSON element
 */
export const safeParse = <
T extends any,
U extends any,
V extends FailureCallbackFunction<U> | undefined = undefined>(
    inputVariable: T,
    callbackOnFailure?: FailureCallbackFunction<U> & V,
  ): V extends undefined ? T | IJson : U | IJson => {
  if (typeof inputVariable === 'string') {
    try {
      const parsed = JSON.parse(inputVariable);
      return isJson(parsed)
        ? parsed : returnValue(new Error('[safeParse] Parsed is not JSON.'), inputVariable, callbackOnFailure);
    } catch (err: any) {
      return returnValue(new Error(`[safeParse] Failed to parse: ${err.message}`), inputVariable, callbackOnFailure);
    }
  }
  return returnValue(new Error(`[safeParse] Type ${typeof inputVariable} is not string.`), inputVariable, callbackOnFailure);
};
