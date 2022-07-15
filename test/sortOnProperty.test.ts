import { sortOnProperty } from '../index';

describe('sortOnProperty', () => {
  it('Sort on property', async () => {
    expect(
      sortOnProperty([{ el: 1 }, { el: 3 }, { el: 2 }], 'el'),
    ).toStrictEqual(
      [{ el: 1 }, { el: 2 }, { el: 3 }],
    );
  });
  it('Sort on property, define direction', async () => {
    expect(
      sortOnProperty([{ el: 1 }, { el: 3 }, { el: 2 }], 'el', -1),
    ).toStrictEqual(
      [{ el: 3 }, { el: 2 }, { el: 1 }],
    );
  });
  it('Sort on property with specials', async () => {
    expect(
      sortOnProperty([
        { el: 0 }, { el: null }, { el: false }, { el: undefined }, { el: '' }, { el: NaN }, { el: 1 }, { el: 2 }, { el: true }, { el: {} }, { el: 'a' },
        { el: 0 }, { el: null }, { el: false }, { el: undefined }, { el: '' }, { el: NaN }, { el: 1 }, { el: 2 }, { el: true }, { el: {} }, { el: 'a' },
      ], 'el', 1),
    ).toStrictEqual([
      { el: false }, { el: false },
      { el: true }, { el: true },
      { el: null }, { el: null },
      { el: NaN }, { el: NaN },
      { el: 0 }, { el: 0 },
      { el: 1 }, { el: 1 },
      { el: 2 }, { el: 2 },
      { el: {} }, { el: {} },
      { el: '' }, { el: '' },
      { el: 'a' }, { el: 'a' },
      { el: undefined }, { el: undefined },
    ]);
  });
  it('Sort on properties', async () => {
    expect(
      sortOnProperty([{ el: 8, a: 'c' }, { el: 8, a: 'b' }, { el: 7, a: 'b' }, { el: 8, a: 'a' }], ['el', 'a'], 1),
    ).toStrictEqual(
      [{ el: 7, a: 'b' }, { el: 8, a: 'a' }, { el: 8, a: 'b' }, { el: 8, a: 'c' }],
    );
    expect(
      sortOnProperty([{ el: 8, a: 'c' }, { el: 8, a: 'b' }, { el: 7, a: 'b' }, { el: 8, a: 'a' }], ['el', 'a'], -1),
    ).toStrictEqual(
      [{ el: 8, a: 'c' }, { el: 8, a: 'b' }, { el: 8, a: 'a' }, { el: 7, a: 'b' }],
    );
  });
});
