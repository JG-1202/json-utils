import { isObject } from '../index';

describe('isObject', () => {
  it('Validates whether input is an Object', () => {
    expect(isObject({})).toStrictEqual(true);
    expect(isObject({ foo: 'bar' })).toStrictEqual(true);
    expect(isObject(null)).toStrictEqual(false);
    expect(isObject([])).toStrictEqual(false);
    expect(isObject(new Date())).toStrictEqual(false);
    expect(isObject('{}')).toStrictEqual(false);
  });
});
