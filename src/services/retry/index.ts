import { isObject } from '../../utils/isObject';
import { merge } from '../../utils/merge';
import { sleep } from '../../utils/sleep';
import { timeout } from '../timeout';

interface Details {
  totalDuration: number,
  iterationDuration: number,
  iteration: number,
  remaining: number,
  error: Error
}

type Callback = (details: Details) => void;

interface RetrySettings {
  retryCallback?: Callback,
  errorCallback?: Callback,
  maximumRetryCount?: number,
  timeout?: number | null,
  fixedBackoff?: number | null,
  backoffExponent?: number,
  maximumBackoff?: number,
  minimumBackoff?: number,
}

const defaultSettings = {
  retryCallback: (details: Details) => void details,
  errorCallback: (details: Details) => void details,
  minimumBackoff: 100,
  backoffExponent: 1.5,
  maximumBackoff: 2000,
  maximumRetryCount: 5,
  timeout: null,
  fixedBackoff: null,
};

class RetryService {
  private settings: Required<RetrySettings>;

  private retryCount: number;

  private startDt: number;

  private iterationStartDt: number;

  private lastDelay?: number;

  constructor(settings?: RetrySettings) {
    this.settings = isObject(settings) ? merge(defaultSettings, settings) : defaultSettings;
    this.retryCount = 0;
    this.startDt = 0;
    this.iterationStartDt = 0;
  }

  isMaximumReached() {
    return this.retryCount > this.settings.maximumRetryCount;
  }

  async callFunction(func: Function, ...args: any[]) {
    this.retryCount += 1;
    return this.settings.timeout !== null
      ? timeout(func(...args), this.settings.timeout)
      : func(...args);
  }

  async callCallback(type: 'retry' | 'error', error: Error) {
    const now = new Date().getTime();
    const remaining = type === 'retry' ? this.settings.maximumRetryCount - this.retryCount : 0;
    return this.settings[`${type}Callback`]({
      totalDuration: now - this.startDt,
      iterationDuration: now - this.iterationStartDt,
      iteration: this.retryCount,
      remaining,
      error,
    });
  }

  async delay() {
    if (this.settings.fixedBackoff !== null) {
      return sleep(this.settings.fixedBackoff);
    }
    this.lastDelay = Math.min(
      this.lastDelay
        ? this.lastDelay * this.settings.backoffExponent
        : this.settings.minimumBackoff,
      this.settings.maximumBackoff,
    );
    return sleep(this.lastDelay);
  }

  async retry<T extends any[]>(func: (...args: T) => any, ...args: T) {
    this.startDt = new Date().getTime();
    return new Promise((resolve, reject) => {
      const retryFunction = async () => {
        this.iterationStartDt = new Date().getTime();
        try {
          resolve(await this.callFunction(func, ...args));
        } catch (error: any) {
          if (!this.isMaximumReached()) {
            await Promise.all([
              this.callCallback('retry', error),
              await this.delay(),
            ]);
            retryFunction();
          } else {
            await this.callCallback('error', error);
            reject(error);
          }
        }
      };
      retryFunction();
    });
  }
}

export const retry = async <T extends any[]>(
  functionToCall: (...args: T) => any,
  functionArguments: T,
  settings?: RetrySettings,
) => (
  new RetryService(settings).retry(functionToCall, ...functionArguments));
