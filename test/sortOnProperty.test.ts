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
