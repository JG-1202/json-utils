import { IObject } from "../../types";

export const isObject = (variable: any): variable is IObject => (
  Object.prototype.toString.call(variable) === '[object Object]');