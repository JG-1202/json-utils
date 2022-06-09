const errorCallbackFunction = (error: any, inputVariable: any) => {
  void error;
  return inputVariable;
};

export const safeParse = (inputVariable: any, callbackOnError = errorCallbackFunction) => {
  try {
    return JSON.parse(inputVariable);
  } catch (error) {
    return callbackOnError(error, inputVariable);
  }
};
