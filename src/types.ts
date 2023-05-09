/**
 * Options for the asyncRetry function.
 */
export interface AsyncRetryOptions {
  /**
   * The maximum number of retries. Defaults to 3.
   */
  maxRetries?: number;

  /**
   * The delay (in milliseconds) between retries. Defaults to 1000.
   */
  delay?: number;

  /**
   * The timeout (in milliseconds) for each function call.
   * If the timeout is exceeded, the function will be retried.
   * If the timeout is exceeded maxRetries times, the onError callback will be called.
   */
  timeout?: number;

  /**
   * A callback function that can be used to handle errors that occur during retries. The function is called with
  * the error object, the number of retries, and the delay (in milliseconds) before the
  * next retry.
  */
  onRetry?: (error: any, retries: number, delay: number) => void;

  /**
   * A callback function that is called when the maximum retries is exceeded.
   * The function is called with the error object.
   */
  onError?: (error: any) => void;
}
