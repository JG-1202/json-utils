import { chopObject } from '../src/utils/chopObject';

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
describe('chopObject', () => {
  it('Chops Object', () => {
    expect(chopObject(startObject, 3)).toStrictEqual([
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
