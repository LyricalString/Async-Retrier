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
export declare const asyncRetry: <T>(fn: () => Promise<T>, options?: AsyncRetryOptions) => Promise<T>;
