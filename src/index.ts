import { AsyncRetryOptions } from '../types';

/**
  Retries an asynchronous function a set number of times until successful or until the maximum number of retries is reached.
  @template T
  @param {() => Promise<T>} fn - The asynchronous function to retry.
  @param {AsyncRetryOptions} [options={}] - The retry options to use.
  @param {number} [options.maxRetries=3] - The maximum number of times to retry the function.
  @param {number} [options.delay=1000] - The delay in milliseconds between each retry attempt.
  @param {(error: any, retries: number, delay: number) => void} [options.onError=() => {}] - The function to call on each retry attempt when an error occurs.
  @returns {Promise<T>} The result of the successful function call.
  @throws {Error} If the function is not provided or if the maximum number of retries is exceeded.
*/
export const asyncRetry = async <T>(
  fn: () => Promise<T>,
  options: AsyncRetryOptions = {}
): Promise<T> => {
  if (typeof fn !== 'function') {
    throw new Error('asyncRetry function must be provided a function');
  }
  let retries = 0;
  const maxRetries = options.maxRetries || 3;
  const delay = options.delay || 1000;
  const onError = options.onError || (() => { });
  while (retries < maxRetries) {
    try {
      return await fn();
    } catch (e) {
      retries++;
      if (retries >= maxRetries) {
        throw e;
      }
      onError(e, retries, delay);
      await new Promise((resolve) => setTimeout(resolve, delay));
    }
  }
  throw new Error(`Unable to complete function after ${maxRetries} retries`);
};
