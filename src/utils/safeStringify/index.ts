import { failureCallbackFunction } from '../../helpers';

export const safeStringify = (inputVariable: any, callbackOnFailure = failureCallbackFunction) => {
  try {
    return JSON.stringify(inputVariable);
  } catch (error) {
    return callbackOnFailure(error, inputVariable);
  }
};
