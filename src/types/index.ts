export type IArray = any[];
export interface IObject {
  [key: string]: any,
}
export type IJson = IObject | IArray;
export type INumber = number;
export type FailureCallbackFunction<W> = (error: any, inputVariable: any) => W;
