import { chop } from '../index';

const startArray = [1, 2, 3, 4, 5, 6, 7, 8, 9, 0];
describe('chop', () => {
  it('Chops Array', () => {
    expect(chop(startArray, 3)).toStrictEqual([[1, 2, 3], [4, 5, 6], [7, 8, 9], [0]]);
  });
  it('Chops Object', () => {
    const startObject = {
      key1: 1,
      key2: 2,
      key3: 3,
      key4: 4,
      key5: 5,
      key6: 6,
      key7: 7,
      key8: 8,
      key9: 9,
      key10: 10,
    };
    expect(chop(startObject, 3)).toStrictEqual([
      {
        key1: 1,
        key2: 2,
        key3: 3,
      },
      {
        key4: 4,
        key5: 5,
        key6: 6,
      },
      {
        key7: 7,
        key8: 8,
        key9: 9,
      },
      {
        key10: 10,
      },
    ]);
  });
});
