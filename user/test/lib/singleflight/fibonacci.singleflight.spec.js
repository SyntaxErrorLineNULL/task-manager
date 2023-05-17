import { SingleFlight } from '../../../lib/SingleFlight/SingleFlight.js';
import { describe, expect, it } from '@jest/globals';

const fib = (n) => {
  if (n === 0) return 0;
  if (n === 1) return 1;
  return fib(n - 1) + fib(n - 2);
}

describe('Fibonacci Sequence SingleFlight', () => {
  it('should be able to solve the Fibonacci sequence algorithm', async () => {
    const singleFlight = new SingleFlight();

    const actual = await singleFlight.Do('fibonacci', fib, 5);
    expect(actual).toEqual(5);
  });
});
