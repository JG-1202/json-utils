import { timeout } from '../index';

const expectError = async (func: any, message: string | null) => {
  let errorMessage = null;
  try {
    await func;
  } catch (err: any) {
    errorMessage = err.message;
  }
  expect(errorMessage).toStrictEqual(message);
};

describe('Timer', () => {
  it('Successfully resolves function before timeout', async () => {
    const test = () => new Promise((resolve) => {
      setTimeout(() => {
        resolve('success');
      }, 100);
    });
    const result = await timeout(test(), 500);
    expect(result).toStrictEqual('success');
  });
  it('Passes error from original function if it completes within timeout', async () => {
    const test = () => new Promise((_resolve, reject) => {
      setTimeout(() => {
        reject(new Error('error'));
      }, 100);
    });
    await expectError(timeout(test(), 500), 'error');
  });
  it('Throws error on timeout', async () => {
    const test = () => new Promise((resolve) => {
      setTimeout(() => {
        resolve('success');
      }, 100);
    });
    await expectError(timeout(test(), 5), 'Timed out after 5 ms.');
  });
});
