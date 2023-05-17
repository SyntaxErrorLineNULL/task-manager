import { SingleFlight } from '../../../lib/SingleFlight/SingleFlight.js';
import { beforeEach, describe, expect, it, jest } from '@jest/globals';

describe('SingleFlight', () => {
  let singleFlight;

  beforeEach(() => {
    singleFlight = new SingleFlight();
  });

  it('function with args', async () => {
    const add = (num) => {
      return num + 2
    }

    const actual = await singleFlight.Do('add2', add, 2);
    expect(actual).toEqual(4);
  })

  it('executes the function for different keys', async () => {
    const mockFn = jest.fn(key => `result for ${key}`);
    const result1 = await singleFlight.Do('key1', () => mockFn('key1'));
    const result2 = await singleFlight.Do('key2', () => mockFn('key2'));

    expect(mockFn).toHaveBeenCalledTimes(2);
    expect(result1).toBe('result for key1');
    expect(result2).toBe('result for key2');
  });

  it('rejects the promise if the function throws an error', async () => {
    const mockFn = jest.fn(() => {
      throw new Error('Function error');
    });

    await expect(singleFlight.Do('key', mockFn)).rejects.toThrow('Function error');
  });

  it('should return ErrTimeOutExecution if function takes too long to complete', async () => {
    const key = 'test-key';

    const fn = () => {
      return new Promise((resolve) => {
        setTimeout(() => {
          resolve('test-value');
        }, 5000);
      });
    };

    await expect(singleFlight.Do(key, fn)).rejects.toThrow('Function execution timed out');
  });
});
