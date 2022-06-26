import { deduplicate } from '../src/utils/deduplicate';

describe('Deduplicate', () => {
  it('Deduplicates simple arrays', () => {
    expect(deduplicate([1, 2, 3, 1, 2, 3])).toStrictEqual([1, 2, 3]);
    expect(deduplicate(['a', 'a', 'b', 'c', '', null, undefined])).toStrictEqual(['a', 'b', 'c', '', null, undefined]);
  });
  it('Deduplicates objects within arrays', () => {
    const objectArray = [{
      test: true,
    }, {
      test: true,
    }, {
      test: false,
    },
    ];
    expect(deduplicate(objectArray)).toStrictEqual([{ test: true }, { test: false }]);
  });
  it('Deduplicates complex objects within arrays', () => {
    const objectArray = [{
      test: true,
      object: {
        array: [1],
      },
    }, {
      test: true,
      object: {
        array: [2],
      },
    },
    {
      test: true,
      object: {
        array: [2],
      },
    },
    { bla: 1 },
    ];
    expect(deduplicate(objectArray)).toStrictEqual([
      {
        test: true,
        object: {
          array: [1],
        },
      }, {
        test: true,
        object: {
          array: [2],
        },
      },
      { bla: 1 },
    ]);
  });
});
