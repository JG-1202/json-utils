export const isNumber = (variable: any): variable is number|string => (
  variable === 0 || (variable && !Number.isNaN(Number(variable)))
)