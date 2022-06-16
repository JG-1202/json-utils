import { merge } from '../index';

const objectA = {
  simpleArray: ['a'],
  dates: {
    dateA: new Date('2022-02-22T22:22:22.222Z'),
  },
  nestedObject: {
    nestA: {
      elementA: 'A',
    },
  },
  nestedArray: [{
    nestedObject: {
      nestD: {
        elementD: 'D',
      },
    },
  }],
};
const objectB = {
  simpleArray: ['b'],
  dates: {
    dateB: new Date('2022-02-23T23:23:23.232Z'),
  },
  nestedObject: {
    nestA: {
      elementB: 'B',
    },
    nestB: {
      elementC: 'C',
    },
  },
  nestedArray: [{
    nestedObject: {
      nestD: {
        elementE: 'E',
      },
    },
  }],
};

describe('merge', () => {
  it('merges objects of same type', () => {
    const result = merge(objectA, objectB);
    expect(result).toEqual({
      simpleArray: ['a', 'b'],
      dates: {
        dateA: new Date('2022-02-22T22:22:22.222Z'),
        dateB: new Date('2022-02-23T23:23:23.232Z'),
      },
      nestedObject: {
        nestA: {
          elementA: 'A',
          elementB: 'B',
        },
        nestB: {
          elementC: 'C',
        },
      },
      nestedArray: [{
        nestedObject: {
          nestD: {
            elementD: 'D',
          },
        },
      },
      {
        nestedObject: {
          nestD: {
            elementE: 'E',
          },
        },
      }],
    });
  });
  it('merges objects of different type', () => {
    const result = merge(objectA, {
      simpleArray: ['c'],
      nestedObject: {
        nestA: {
          elementB: 'B',
        },
        nestB: {
          elementC: 'C',
        },
      },
      newObject: {
        elementF: 'F',
      },
    });
    expect(result).toEqual({
      simpleArray: ['a', 'c'],
      dates: {
        dateA: new Date('2022-02-22T22:22:22.222Z'),
      },
      nestedObject: {
        nestA: {
          elementA: 'A',
          elementB: 'B',
        },
        nestB: {
          elementC: 'C',
        },
      },
      nestedArray: [{
        nestedObject: {
          nestD: {
            elementD: 'D',
          },
        },
      }],
      newObject: {
        elementF: 'F',
      },
    });
  });
  it('overwrites equal keys', () => {
    const result = merge(
      { object: { elementA: 1 } },
      { object: { elementB: 2 } },
      { object: { elementA: 3 } },
    );
    expect(result).toStrictEqual({ object: { elementA: 3, elementB: 2 } });
  });
  it('overwrites equal of different type', () => {
    const result = merge(
      { object: { elementA: 1 } },
      { object: { elementB: 2 } },
      { object: { elementA: { internalElement: 'c' } } },
    );
    expect(result).toStrictEqual({ object: { elementA: { internalElement: 'c' }, elementB: 2 } });
  });
  it('merges arrays', () => {
    const result = merge(['a', 'b'], ['c', 'a']);
    expect(result).toStrictEqual(['a', 'b', 'c', 'a']);
  });
});
