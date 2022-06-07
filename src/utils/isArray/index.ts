import { IArray } from "../../types";

export const isArray = (variable: any): variable is IArray => Array.isArray(variable);