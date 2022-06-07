import { IArray } from "../../types";

export const chopArray = <T extends IArray>(toChop: T, chopSize: number): T[] => {
  const result:T[] = [];
  for (let i = 0; i < toChop.length; i += chopSize) {
    result.push(toChop.slice(i, i + chopSize) as T);
  }
  return result;
};