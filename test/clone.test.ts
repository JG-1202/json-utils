import { clone } from '../index';

describe('Clone objects', () => {
  it('If objects are cloned changes do not affect each other', () => {
    const object = { test: true, someArray: [{ foo: 'bar' }] };
    const object2 = clone(object);
    object2.test = false;
    object2.someArray.push({ foo: 'bar2' });
    expect(object).toStrictEqual({ test: true, someArray: [{ foo: 'bar' }] });
    expect(object2).toStrictEqual({ test: false, someArray: [{ foo: 'bar' }, { foo: 'bar2' }] });
  });
  it('It returns string if input is string', () => {
    const result = clone('test');
    expect(result).toStrictEqual('test');
  });
});
