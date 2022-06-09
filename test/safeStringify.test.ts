import { safeStringify } from '../index';

interface FooBarType {
  bar?: any,
}

describe('safeStringify', () => {
  it('Stringifies input', () => {
    const input = { foo: 'bar' };
    expect(safeStringify(input)).toStrictEqual(JSON.stringify(input));
  });
  it('On default returns variable on failure', () => {
    const foo: FooBarType = {};
    foo.bar = foo;
    expect(safeStringify(foo)).toStrictEqual(foo);
  });
  it('Calls provided callback', () => {
    const foo: FooBarType = {};
    foo.bar = foo;
    const callbackFn = jest.fn(() => null);
    let expectedError;
    try {
      JSON.stringify(foo);
    } catch (err) {
      expectedError = err;
    }
    expect(safeStringify(foo, callbackFn)).toStrictEqual(null);
    expect(callbackFn).toHaveBeenCalledTimes(1);
    expect(callbackFn).toHaveBeenCalledWith(expectedError, foo);
  });
});
