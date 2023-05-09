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
     * A callback function that can be used to handle errors that occur during retries. The function is called with
    * the error object, the number of retries, and the delay (in milliseconds) before the
    * next retry.
    */
    onError?: (error: any, retries: number, delay: number) => void;
}
