import { AsyncRetryOptions } from '../types';

/**
 * A function that retries an asynchronous function until it succeeds, or until
 * the maximum number of retries is reached.
 *
 * @param fn The asynchronous function to retry.
 * @param options The retry options.
 * @returns The result of the asynchronous function.
 */
export const asyncRetry = async <T>(
  fn: () => Promise<T>,
  options: AsyncRetryOptions = {}
): Promise<T> => {
  let retries = 0;
  const maxRetries = options.maxRetries || 3;
  const factor = options.factor || 1;
  const onError = options.onError || (() => { });
  while (retries < maxRetries) {
    try {
      return await fn();
    } catch (e) {
      retries++;
      if (retries >= maxRetries) {
        throw e;
      }
      const delay = Math.pow(factor, retries) * 100;
      onError(e, retries, delay);
      await new Promise((resolve) => setTimeout(resolve, delay));
    }
  }
  throw new Error(`Unable to complete function after ${maxRetries} retries`);
};
