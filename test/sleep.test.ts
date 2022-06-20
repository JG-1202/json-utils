import { sleep } from '../index';

describe('sleep', () => {
  it('waits', async () => {
    const waitDuration = 1000;
    const start = new Date().getTime();
    await sleep(waitDuration);
    const end = new Date().getTime();
    expect((end - start) >= waitDuration).toStrictEqual(true);
  });
});
