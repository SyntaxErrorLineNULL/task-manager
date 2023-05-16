import { describe, expect, it } from '@jest/globals';
import { Mutex } from '../../../lib/Mutex/Mutex';

describe('Mutex', () => {
  it('should allow acquiring and releasing the lock', async () => {
    const mutex = new Mutex();

    // Acquire the lock
    await mutex.acquire();
    expect(mutex.isLocked()).toBe(true);

    // Release the lock
    mutex.release();
    expect(mutex.isLocked()).toBe(false);
  });
});

