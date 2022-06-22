import { isEqual } from '../index';

describe('isEqual', () => {
  it('Tests simple equality', () => {
    expect(isEqual('a', 'a')).toStrictEqual(true);
    expect(isEqual(1, 1)).toStrictEqual(true);
    expect(isEqual('1', '1')).toStrictEqual(true);
    expect(isEqual(null, null)).toStrictEqual(true);
    expect(isEqual(undefined, undefined)).toStrictEqual(true);
    expect(isEqual({}, {})).toStrictEqual(true);
    expect(isEqual([], [])).toStrictEqual(true);
  });
  it('Tests simple inequality', () => {
    expect(isEqual('a', 'b')).toStrictEqual(false);
    expect(isEqual(1, '1')).toStrictEqual(false);
    expect(isEqual(null, 0)).toStrictEqual(false);
    expect(isEqual(null, undefined)).toStrictEqual(false);
    expect(isEqual({}, [])).toStrictEqual(false);
    expect(isEqual({}, new Date())).toStrictEqual(false);
  });
  it('Tests object equality', () => {
    expect(isEqual(
      { foo: 'bar' },
      { foo: 'bar' },
    )).toStrictEqual(true);
    expect(isEqual(
      { foo: 'bar', nested: { test: true } },
      { nested: { test: true }, foo: 'bar' },
    )).toStrictEqual(true);
  });
  it('Tests object inequality', () => {
    expect(isEqual(
      { foo: 'bar' },
      { bar: 'f00' },
    )).toStrictEqual(false);
    expect(isEqual(
      { foo: 'bar', nested: { test: true } },
      { nested: { test: false }, foo: 'bar' },
    )).toStrictEqual(false);
  });
  it('Tests array equality', () => {
    expect(isEqual(
      [1, 2, 3],
      [1, 2, 3],
    )).toStrictEqual(true);
    expect(isEqual(
      [1, [2, 4, 8, 16], 3],
      [1, [2, 4, 8, 16], 3],
    )).toStrictEqual(true);
  });
  it('Tests array inequality', () => {
    expect(isEqual(
      [1, 2, 3],
      [1, 3, 2],
    )).toStrictEqual(false);
    expect(isEqual(
      [1, [2, 4, 8, 16], 3],
      [1, 2, [2, 4, 8, 16]],
    )).toStrictEqual(false);
  });
  it('Tests date (in)equality', () => {
    expect(isEqual(
      new Date('2022-02-02T22:22:22.222Z'),
      new Date('2022-02-02T22:22:22.222Z'),
    )).toStrictEqual(true);
    expect(isEqual(
      new Date('2022-02-02T22:22:22.222Z'),
      new Date('2022-03-03T22:22:22.222Z'),
    )).toStrictEqual(false);
  });
});
