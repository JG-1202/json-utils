import { isNumber } from '../index';

describe('isNumber', () => {
  it('Validates whether input is a Number', () => {
    expect(isNumber(1)).toStrictEqual(true);
    expect(isNumber(1.12345)).toStrictEqual(true);
    expect(isNumber('1')).toStrictEqual(true);
    expect(isNumber('1.2345')).toStrictEqual(true);
    expect(isNumber(0)).toStrictEqual(true);
    expect(isNumber('0')).toStrictEqual(true);
    expect(isNumber('0.0314E+2')).toStrictEqual(true);
    expect(isNumber('1a')).toStrictEqual(false);
    expect(isNumber('abc')).toStrictEqual(false);
    expect(isNumber('')).toStrictEqual(false);
    expect(isNumber({})).toStrictEqual(false);
    expect(isNumber({ foo: 'bar' })).toStrictEqual(false);
    expect(isNumber(null)).toStrictEqual(false);
    expect(isNumber([])).toStrictEqual(false);
    expect(isNumber([0])).toStrictEqual(false);
    expect(isNumber([10])).toStrictEqual(false);
    expect(isNumber(new Date())).toStrictEqual(false);
    expect(isNumber('{}')).toStrictEqual(false);
  });
});
