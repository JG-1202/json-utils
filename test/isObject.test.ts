/* eslint-disable max-classes-per-file */
import { isObject } from '../index';

describe('isObject', () => {
  it('Validates whether input is an Object with basic tests', () => {
    expect(isObject({})).toStrictEqual(true);
    expect(isObject({ foo: 'bar' })).toStrictEqual(true);
    expect(isObject([])).toStrictEqual(false);
    expect(isObject(new Date())).toStrictEqual(false);
    expect(isObject('{}')).toStrictEqual(false);
  });
  it('Validates that an object with null is not an object', () => {
    expect(isObject(null)).toStrictEqual(false);
    expect(isObject(Object.create(null))).toStrictEqual(false);
  });
  it('Validates that a class is not an object', () => {
    // eslint-disable-next-line
    class Foo { constructor() {} }
    // eslint-disable-next-line
    class Bar { }
    expect(isObject(Foo)).toStrictEqual(false);
    expect(isObject(new Foo())).toStrictEqual(false);
    expect(isObject(Bar)).toStrictEqual(false);
    expect(isObject(new Bar())).toStrictEqual(false);
  });
  it('Validates that an object with an constructor property is still an object', () => {
    expect(isObject({ constructor: 123 })).toStrictEqual(true);
    expect(isObject({ constructor: () => 123 })).toStrictEqual(true);
  });
});
