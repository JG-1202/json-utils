const errorCallbackFunction = (error: any, variable: any) => {
  void error;
  return variable;
};

export const safeParse = (variable: any, callbackOnError = errorCallbackFunction) => {
  try {
    return JSON.parse(variable);
  } catch (error) {
    return callbackOnError(error, variable);
  }
};
