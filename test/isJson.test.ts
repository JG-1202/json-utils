import { isJson } from '../index';

describe('isObject', () => {
  it('Validates whether input is an Object', () => {
    expect(isJson({})).toStrictEqual(true);
    expect(isJson({ foo: 'bar' })).toStrictEqual(true);
    expect(isJson([])).toStrictEqual(true);
    expect(isJson([1, 2, 3])).toStrictEqual(true);
    expect(isJson(null)).toStrictEqual(false);
    expect(isJson(new Date())).toStrictEqual(false);
    expect(isJson(Buffer.from([]))).toStrictEqual(false);
    expect(isJson('{}')).toStrictEqual(false);
    expect(isJson('[]')).toStrictEqual(false);
  });
});
