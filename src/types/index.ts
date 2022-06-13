export type IArray = unknown[];
export type IObject = {
  [k:string]: unknown,
};
export type IJson = IObject | IArray;
export type INumber = number;
export type FailureCallbackFunction<W> = (error: unknown, inputVariable: unknown) => W;
