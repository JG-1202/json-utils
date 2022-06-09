import { chopArray } from '../index';

const startArray = [1, 2, 3, 4, 5, 6, 7, 8, 9, 0];
describe('chopArray', () => {
  it('Chops Array', () => {
    expect(chopArray(startArray, 3)).toStrictEqual([[1, 2, 3], [4, 5, 6], [7, 8, 9], [0]]);
  });
});
