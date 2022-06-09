import { isArray } from '../index';

describe('isArray', () => {
  it('Validates whether input is an Array', () => {
    expect(isArray([])).toStrictEqual(true);
    expect(isArray([1, 2, 3])).toStrictEqual(true);
    expect(isArray({})).toStrictEqual(false);
    expect(isArray(null)).toStrictEqual(false);
    expect(isArray(undefined)).toStrictEqual(false);
    expect(isArray(Buffer.from([]))).toStrictEqual(false);
    expect(isArray('[]')).toStrictEqual(false);
  });
});
