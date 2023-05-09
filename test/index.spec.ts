import { expect } from 'chai';
import { asyncRetry } from '../src';

describe('asyncRetry', () => {
  it('should return the result of the function on success', async () => {
    const fn = () => Promise.resolve('success');
    const result = await asyncRetry(fn);
    expect(result).to.equal('success');
  });

  it('should retry the function until it succeeds', async () => {
    let retries = 0;
    const fn = () => {
      retries++;
      if (retries < 3) {
        return Promise.reject(new Error('failure'));
      } else {
        return Promise.resolve('success');
      }
    };
    const result = await asyncRetry(fn, { maxRetries: 5 });
    expect(result).to.equal('success');
  });

  it('should throw an error if the function fails after all retries', async () => {
    const fn = () => Promise.reject(new Error('failure'));
    try {
      await asyncRetry(fn, { maxRetries: 3 });
      throw new Error('Expected function to throw an error');
    } catch (e) {
      expect(e.message).to.equal('failure');
    }
  });
});