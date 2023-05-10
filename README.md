# 🔄 Async-Retrier 🔄

**Async-Retrier** is a simple yet powerful package to retry asynchronous functions until they succeed or reach the maximum number of retries.

## 💾 Installation

Install the package using NPM:

```bash
npm install async-retrier
```

Or using Yarn:

```bash
yarn add async-retrier
```

## 🚀 Usage

Import the `asyncRetry` function from the package and use it with your desired asynchronous function:

```javascript
import { asyncRetry } from "async-retrier"

const options = {
  maxRetries: 5, // Number of retries, defaults to 3
  delay: 5000, // Delay in milliseconds, defaults to 1000
  timeout: 10000, // Timeout in milliseconds, defaults to 0. If set to a positive number, the operation will be cancelled if it takes longer than the timeout.
  onRetry: (err, retries, delay) =>
    console.log(
      `Retry ${retries} failed with error: ${err}. Retrying in ${delay}ms.`
    ), // Function to call on error, default do nothing
}

const result = await asyncRetry(async () => {
  // your asynchronous operation here
}, options).catch((err) => {
  // handle error
})

console.log(result)
```

📖 API

`asyncRetry(fn: () => Promise<T>, options: AsyncRetryOptions = {}): Promise<T>`

- `fn`: The asynchronous function to retry.
- `options`: An optional object with the following properties:
  - `maxRetries`: The maximum number of retries (default: 3).
  - `delay`: The delay time (in miliseconds) between retries (default: 1000).
  - `onError`: An error handling function that will be called on each retry (default: empty function).

## 📝 License

This package is licensed under the MIT License.
