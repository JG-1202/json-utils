import { deepParse } from '../index';

describe('deepParse', () => {
  it('Deep parses stringified Object', () => {
    const testObject = JSON.stringify({
      someKey: {
        nonStringifiedElement: [
          {
            nonStringified: '123',
          },
          JSON.stringify({ stringified: 567 }),
        ],
        stringifiedElement: JSON.stringify({
          foo: 'bar',
        }),
      },
    });
    expect(deepParse(testObject)).toStrictEqual({
      someKey: {
        nonStringifiedElement: [
          {
            nonStringified: '123',
          },
          { stringified: 567 },
        ],
        stringifiedElement: {
          foo: 'bar',
        },
      },
    });
  });
});
