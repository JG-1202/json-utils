export type ArrayType = unknown[];

export type ObjectType = {
  [k:string]: unknown,
};

export type JsonType = ObjectType | ArrayType;

export type FailureCallbackFunction<W> = (error: unknown, inputVariable: unknown) => W;

export type DeepPartial<T> = {
  [P in keyof T]?: T[P] extends JsonType ? DeepPartial<T[P]> : T[P];
};

export type DeepRequired<T> = { [P in keyof T]: DeepRequired<T[P]> } & Required<T>;
