export const isDate = (variable: any): variable is Date => (
  Object.prototype.toString.call(variable) === '[object Date]');
