/**
 * Set a timeout to a Promise. An error will be thrown when timeout is exceeded.
 */
export const timeout = async <T extends any> (promise: Promise<T>, timeoutMs: number) => {
  class Timer {
    private id?: NodeJS.Timeout;

    start() {
      return new Promise((_resolve, reject) => {
        this.id = setTimeout(() => {
          reject(new Error(`Timed out after ${timeoutMs} ms.`));
        }, timeoutMs);
      });
    }

    stop() {
      clearTimeout(this.id);
    }
  }
  const timer = new Timer();
  try {
    const result = await Promise.race([promise, timer.start()]);
    timer.stop();
    return result;
  } catch (err) {
    timer.stop();
    throw err;
  }
};
