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
  it('Returns non-string', () => {
    const input = null;
    expect(safeParse(input)).toStrictEqual(input);
  });
  it('Calls provided callback on failed parse attempt', () => {
    const input = 'someString';
    const callbackFn = jest.fn(() => null);
    const result = safeParse(input, callbackFn);
    expect(result).toStrictEqual(null);
    expect(callbackFn).toHaveBeenCalledTimes(1);
    expect(callbackFn).toHaveBeenCalledWith(new Error('[safeParse] Failed to parse: Unexpected token s in JSON at position 0'), input);
  });
  it('Calls provided callback on invalid type', () => {
    const input = 123;
    const callbackFn = jest.fn(() => null);
    const result = safeParse(input, callbackFn);
    expect(result).toStrictEqual(null);
    expect(callbackFn).toHaveBeenCalledTimes(1);
    expect(callbackFn).toHaveBeenCalledWith(new Error('[safeParse] Type number is not string.'), input);
  });
  it('Calls provided callback on invalid type', () => {
    const input = '123';
    const callbackFn = jest.fn(() => null);
    const result = safeParse(input, callbackFn);
    expect(result).toStrictEqual(null);
    expect(callbackFn).toHaveBeenCalledTimes(1);
    expect(callbackFn).toHaveBeenCalledWith(new Error('[safeParse] Parsed is not JSON.'), input);
  });
});
