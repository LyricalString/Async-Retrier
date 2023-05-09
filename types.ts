/**
 * Options for the asyncRetry function.
 */
export interface AsyncRetryOptions {
  /**
   * The maximum number of retries. Defaults to 3.
   */
  maxRetries?: number;

  /**
   * The backoff factor. Defaults to 1.
   */
  factor?: number;

  /**
   * A callback function that can be used to handle errors that occur during retries. The function is called with
  * the error object, the number of retries, and the delay (in milliseconds) before the
  * next retry.
  */
  onError?: (error: any, retries: number, delay: number) => void;
}
