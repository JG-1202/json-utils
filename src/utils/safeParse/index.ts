const failureCallbackFunction = (error: any, inputVariable: any) => {
  void error;
  return inputVariable;
};

export const safeParse = (inputVariable: any, callbackOnFailure = failureCallbackFunction) => {
  try {
    return JSON.parse(inputVariable);
  } catch (error) {
    return callbackOnFailure(error, inputVariable);
  }
};
