import { IObject } from "../../types";

export const chopObject = <T extends IObject>(toChop: T, chopSize: number): Partial<T>[] => {
  const result = [];
  const entries = Object.entries(toChop);
  for (let i = 0; i < entries.length; i += chopSize) {
    const objectEntries = entries.slice(i, i + chopSize);
    result.push(Object.fromEntries(objectEntries) as Partial<T>);
  }
  return result;
};