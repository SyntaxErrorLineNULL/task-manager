import { describe, expect, it } from '@jest/globals';
import { Mutex } from '../../../lib/Mutex/Mutex';

describe('Mutex', () => {
  let mutex;

  beforeEach(() => {
    mutex = new Mutex();
  });

  afterEach(() => {
    mutex = null;
  });

  it('should acquire and release the lock', async () => {
    await mutex.acquire();
    expect(mutex.isLocked()).toBe(true);
    mutex.release();
    expect(mutex.isLocked()).toBe(false);
  });

  it('should allow acquiring and releasing the lock', async () => {
    // Acquire the lock
    await mutex.acquire();
    expect(mutex.isLocked()).toBe(true);

    // Release the lock
    mutex.release();
    expect(mutex.isLocked()).toBe(false);
  });

  it('throw error if unlocking unlocked mutex', () => {
    const mutex = new Mutex();
    expect(() => mutex.release()).toThrowError('Mutex is not locked');
  });

  it('should allow multiple acquires and releases',  () => {
    mutex.acquire();
    expect(mutex.isLocked()).toBe(true);

    mutex.acquire();
    expect(mutex.isLocked()).toBe(true);

    mutex.release();
    expect(mutex.isLocked()).toBe(true);

    mutex.release();
    expect(mutex.isLocked()).toBe(false);
  });

  it('should queue promises and release them in order', async () => {
    const order = [];
    // Acquire the lock for the first promise
    Promise.all([
      mutex.acquire(),
      order.push(1),

      mutex.acquire(),
      order.push(2),

      mutex.acquire(),
      order.push(3),

      mutex.acquire(),
      order.push(4),
    ])

    // Wait briefly to ensure the queued promises haven't been released yet
    new Promise((resolve) => setTimeout(resolve, 100));

    // The lock should still be held by the first promise
    expect(mutex.isLocked()).toBe(true);
    // Release the lock, allowing the queued promises to acquire it in order
    mutex.release();

    // All promises should have been released in order
    expect(order).toEqual([1, 2, 3, 4]);
    expect(mutex.isLocked()).toBe(true);
  });
});

