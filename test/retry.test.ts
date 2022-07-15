import { retry } from '../index';

describe('Retry', () => {
  it('Call retry client, success on first attempt', async () => {
    const functionToCall = jest.fn((...input: any) => new Promise((resolve) => {
      void input;
      resolve('success');
    }));
    const result = await retry(functionToCall, ['a', 1, 'b', 2]);
    expect(result).toStrictEqual('success');
    expect(functionToCall).toBeCalledWith('a', 1, 'b', 2);
    expect(functionToCall).toBeCalledTimes(1);
  });
  it('Call retry client, success on third attempt', async () => {
    const retryResponses: any[] = [];
    const errorResponses: any[] = [];
    const retryCallback = jest.fn((response) => retryResponses.push(response));
    const errorCallback = jest.fn((response) => errorResponses.push(response));
    const retrySettings = {
      retryCallback,
      errorCallback,
      timeout: 1000,
    };
    let counter = 0;
    const functionToCall = jest.fn(
      (...input: any) => new Promise((resolve, reject) => {
        void input;
        counter += 1;
        if (counter >= 3) {
          resolve('success');
        } else {
          reject(new Error('error'));
        }
      }),
    );
    const result = await retry(functionToCall, ['a', 1, 'b', 2], retrySettings);
    expect(result).toStrictEqual('success');
    expect(functionToCall).toBeCalledWith('a', 1, 'b', 2);
    expect(functionToCall).toBeCalledTimes(3);
    expect(retryCallback).toBeCalledTimes(2);
    expect(errorCallback).toBeCalledTimes(0);
    expect(retryResponses.length).toStrictEqual(2);
    expect(errorResponses.length).toStrictEqual(0);
    retryResponses.forEach((retryResponse, index) => {
      expect(retryResponse.error.message).toStrictEqual('error');
      expect(retryResponse.iteration).toStrictEqual(index + 1);
      expect(retryResponse.remaining).toStrictEqual(4 - index);
    });
  });
  it('Call retry client, fails every time', async () => {
    const functionToCall = jest.fn((a: any) => new Promise((_resolve, reject) => {
      void a;
      reject(new Error('error'));
    }));
    let errorMessage = null;
    try {
      await retry(functionToCall, ['a']);
    } catch (err: any) {
      errorMessage = err.message;
    }
    expect(errorMessage).toStrictEqual('error');
    expect(functionToCall).toBeCalledWith('a');
    expect(functionToCall).toBeCalledTimes(6);
  });
  it('Call retry client, fails every time, with custom retry-/errorCallback', async () => {
    const retryResponses: any[] = [];
    const errorResponses: any[] = [];
    const retryCallback = jest.fn((response) => retryResponses.push(response));
    const errorCallback = jest.fn((response) => errorResponses.push(response));
    const retrySettings = {
      retryCallback,
      errorCallback,
    };
    const functionToCall = jest.fn(() => new Promise((_resolve, reject) => {
      reject(new Error('test error'));
    }));
    let errorMessage = null;
    try {
      await retry(functionToCall, [], retrySettings);
    } catch (err: any) {
      errorMessage = err.message;
    }
    expect(errorMessage).toStrictEqual('test error');
    expect(functionToCall).toBeCalledTimes(6);
    expect(retryCallback).toBeCalledTimes(5);
    expect(errorCallback).toBeCalledTimes(1);
    expect(retryResponses.length).toStrictEqual(5);
    retryResponses.forEach((retryResponse, index) => {
      expect(retryResponse.error.message).toStrictEqual('test error');
      expect(retryResponse.iteration).toStrictEqual(index + 1);
      expect(retryResponse.remaining).toStrictEqual(4 - index);
    });
    expect(errorResponses.length).toStrictEqual(1);
    errorResponses.forEach((errorResponse) => {
      expect(errorResponse.error.message).toStrictEqual('test error');
      expect(errorResponse.iteration).toStrictEqual(6);
      expect(errorResponse.remaining).toStrictEqual(0);
    });
  });
  it('Call retry client, times out two times, success on third attempt', async () => {
    const retryResponses: any[] = [];
    const errorCallback = jest.fn();
    const retryCallback = jest.fn((response) => retryResponses.push(response));
    const retrySettings = {
      timeout: 500,
      retryCallback,
      errorCallback,
    };
    let counter = 0;
    const functionToCall = jest.fn(() => new Promise((resolve) => {
      counter += 1;
      if (counter >= 3) {
        resolve('success');
      } else {
        setTimeout(() => {
          resolve('success after 1 sec');
        }, 1000).unref();
      }
    }));
    const result = await retry(functionToCall, [], retrySettings);
    expect(result).toStrictEqual('success');
    expect(functionToCall).toBeCalledTimes(3);
    expect(retryCallback).toBeCalledTimes(2);
    expect(errorCallback).toBeCalledTimes(0);
    expect(retryResponses[0].error.message).toStrictEqual('Timed out after 500 ms.');
    expect(retryResponses[1].error.message).toStrictEqual('Timed out after 500 ms.');
  });
  it('Call retry client, input function of another class', async () => {
    class Tester {
      private value: number;

      constructor() {
        this.value = 13;
      }

      getMultitude(factor: number) {
        return new Promise((resolve) => { resolve(this.value * factor); });
      }
    }
    const tester = new Tester();
    const result = await retry(tester.getMultitude.bind(tester), [2]);
    expect(result).toStrictEqual(26);
  });
  it('Uses exponential backoff vs fixed backoff', async () => {
    const functionToCall = jest.fn((a: any) => new Promise((_resolve, reject) => {
      void a;
      reject(new Error('error'));
    }));
    let errorMessage = null;
    const startExponential = new Date().getTime();
    try {
      await retry(functionToCall, ['a'], { maximumRetryCount: 1 });
    } catch (err: any) {
      errorMessage = err.message;
    }
    const endExponential = new Date().getTime() - startExponential;
    const startFixed = new Date().getTime();
    try {
      await retry(functionToCall, ['a'], { maximumRetryCount: 1, fixedBackoff: 1000 });
    } catch (err: any) {
      errorMessage = err.message;
    }
    const endFixed = new Date().getTime() - startFixed;
    expect(errorMessage).toStrictEqual('error');
    expect(functionToCall).toBeCalledWith('a');
    expect(functionToCall).toBeCalledTimes(4);
    expect(endExponential * 5 < endFixed).toStrictEqual(true);
    expect(endFixed > 500).toStrictEqual(true);
  });
});
