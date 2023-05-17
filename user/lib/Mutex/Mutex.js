'use strict';

/**
 * A mutex (mutual exclusion) is a synchronization object used to protect shared resources.
 * It provides mutual exclusion, allowing only one thread or process to enter and execute
 * critical sections of code at a time.
 */
export class Mutex {
  /**
   * @description Whether or not the mutex is currently locked.
   * @type {boolean}
   * @private
   */
  #locked;

  /**
   * @description Queue of promises that are waiting to acquire the lock.
   * @type {Array<Function>}
   * @private
   */
  #queue;

  /**
   * Track the current promise holding the lock.
   * @type {Promise<void> | null}
   * @private
   */
  #currentPromise;
  constructor() {
    this.#locked = false;
    this.#queue = [];
    this.#currentPromise = null;
  }

  /**
   * Acquire the lock. If the lock is already held, wait until it is released before
   * acquiring it.
   * @returns { Promise<void> }
   */
  acquire() {
    return new Promise((resolve) => {
      // If the lock is not currently held and there is no current promise,
      // it means the lock is available, so we can acquire it immediately.
      if (!this.#locked && !this.#currentPromise) {
        // Mark the lock as acquired
        this.#locked = true;

        // Save the current promise that holds the lock
        this.#currentPromise = resolve;

        // Resolve the promise to indicate successful acquisition
        resolve();
      } else {
        // If the lock is already held or there is a current promise,
        // it means the lock is unavailable, so we add the promise to the queue.
        // Add the promise to the queue to wait for lock availability
        this.#queue.push(resolve);
      }
    });
  }

  /**
   * Release the lock. If there are other promises waiting to acquire the lock, wake
   * up the next one and give it the lock.
   * @throws { Error } If the lock is not currently held.
   */
  release() {
    // Check if the lock is currently held
    if (!this.#locked) {
      throw new Error('Mutex is not locked');
    }

    // Mark the lock as released
    this.#locked = false;

    // Check if there are promises waiting in the queue
    if (this.#queue.length > 0) {
      // If there are promises waiting, wake up the next one and give it the lock

      // Retrieve the next promise in the queue
      const next = this.#queue.shift();

      // Mark the lock as acquired
      this.#locked = true;

      // Update the current promise to the one that holds the lock
      this.#currentPromise = next;
      // Invoke the promise to indicate successful acquisition
      next();
    } else {
      // If there are no promises waiting in the queue, clear the current promise
      // No more promises holding the lock
      this.#currentPromise = null;
    }
  }

  /**
   * Check if the mutex is currently locked.
   * @returns {boolean} True if the mutex is locked, false otherwise.
   */
  isLocked() {
    return this.#locked;
  }
}
