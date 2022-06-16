export type ArrayType = unknown[];
export type ObjectType = {
  [k:string]: unknown,
};
export type JsonType = ObjectType | ArrayType;
export type FailureCallbackFunction<W> = (error: unknown, inputVariable: unknown) => W;
