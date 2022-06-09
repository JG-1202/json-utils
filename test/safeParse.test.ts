import { safeParse } from '../index';

describe('safeParse', () => {
  it('Parses stringified input', () => {
    const input = { foo: 'bar' };
    expect(safeParse(JSON.stringify(input))).toStrictEqual(input);
  });
  it('On default returns variable on failure', () => {
    const input = 'someString';
    expect(safeParse(input)).toStrictEqual(input);
  });
  it('Calls provided callback', () => {
    const input = 'someString';
    const callbackFn = jest.fn(() => null);
    let expectedError;
    try {
      JSON.parse(input);
    } catch (err) {
      expectedError = err;
    }
    expect(safeParse(input, callbackFn)).toStrictEqual(null);
    expect(callbackFn).toHaveBeenCalledTimes(1);
    expect(callbackFn).toHaveBeenCalledWith(expectedError, input);
  });
});
