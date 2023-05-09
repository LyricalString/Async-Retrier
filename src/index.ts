import { AsyncRetryOptions } from './types';

/**
  Retries an asynchronous function a set number of times until successful or until the maximum number of retries is reached.
  @template T
  @param {() => Promise<T>} fn - The asynchronous function to retry.
  @param {AsyncRetryOptions} [options={}] - The retry options to use.
  @param {number} [options.maxRetries=3] - The maximum number of times to retry the function.
  @param {number} [options.delay=1000] - The delay in milliseconds between each retry attempt.
  @param {number} [options.timeout] - The timeout in milliseconds for each function call.
  @param {(error: Error, retries: number, delay: number) => void} [options.onRetry=() => {}] - The function to call on each retry attempt when an error occurs.
  @param {(error: Error) => void} [options.onError=() => {}] - The function to call when the function times out or if the maximum number of retries is exceeded.
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
  const timeout = options.timeout;
  const onRetry = options.onRetry || (() => { });
  const onError = options.onError || (() => { });
  while (retries < maxRetries) {
    try {
      if (timeout) {
        const result = await Promise.race([fn(), new Promise((_, reject) => setTimeout(() => reject(new Error('Function timed out')), timeout))]);
        return result as T;
      } else {
        return await fn();
      }
    } catch (e) {
      retries++;
      if (retries >= maxRetries) {
        onError(e);
      }
      onRetry(e, retries, delay);
      await new Promise((resolve) => setTimeout(resolve, delay));
    }
  }
  throw new Error(`Unable to complete function after ${maxRetries} retries`);
};
