'use strict';

import { Mutex } from '../Mutex/Mutex';

// maximum time for function execution in milliseconds
const MAX_EXECUTION_TIME = 3000;

// error to throw if function execution times out
const ErrTimeOutExecution = new Error('Function execution timed out');

/**
 * @class SingleFlight
 * @description The SingleFlight class provides a method called Do that executes a given function once per key in parallel,
 * while ensuring that only one instance of the function is executing for a given key at a time.
 * If a function is requested for a specific key, and there is already a function executing for that key,
 * the request is queued, and the result of the original function is returned to all queued requests once it has completed.
 * The class uses a mutex to ensure thread safety and a map to cache the results of executed functions.
 */
export class SingleFlight {
  /**
   * @param {import('../Mutex/Mutex')} #mutex
   * @description The use of Mutex in this solution prevents race conditions by ensuring that only one
   * request is executing for a given key at any given time. If multiple requests are made for the same key,
   * they are queued and executed one at a time when the previous request has finished.
   * This prevents race conditions and ensures that the function associated with a given key
   * is executed only once, even when multiple requests are made concurrently.
   * @private
   */
  #mutex;

  /**
   * @type {Map<string|Symbol, Promise<any>>}
   * @description A map to cache the promises associated with function calls for different keys.
   * Each key maps to a promise that represents the execution of a function for that key.
   * The map is used to store the promises and retrieve them when needed.
   * @private
   */
  #cache;

  constructor () {
    // Create a new mutex instance to synchronize access to the cache map.
    this.#mutex = new Mutex();
    // Create a new empty map to store cached function call.
    this.#cache = new Map();
  }

  /**
   * Executes the function associated with the given key. If the function has already been executed for the given
   * key, returns the cached result instead of executing the function again.
   *
   * @param {string|Symbol} key - The key to use for caching the result of the function.
   * @param {Function} fn - The function to execute.
   * @param {...any} args - The arguments to pass to the function.
   * @return {Promise<void>} - A promise that resolves with the result of the function.
   */
  async Do(key, fn, ...args) {
    // Lock the mutex to synchronize access to the cache map.
    await this.#mutex.acquire();

    // Check if a promise already exists for the given key in the cache map.
    // If a promise already exists for the key, return the promise.
    // Otherwise, create a new promise using the fn parameter and store it in the cache map under the specified key.
    let call;

    // If the key is already present in the cache, return the cached promise.
    if (this.#cache.has(key)) {
      call = this.#cache.get(key);
    } else {
      // Otherwise, create a new function call to execute the function and cache it.
      // Create a new promise to execute the function and cache it.
      call = new Promise(async (resolve, reject) => {
        try {
          const result = await Promise.race([fn.apply(this, args), new Promise((_, reject) => {
            setTimeout(() => {
              this.#cache.delete(key);
              // if the function that was passed to the method takes too long to execute, you must return an error
              reject(ErrTimeOutExecution);
            }, MAX_EXECUTION_TIME);
          })]);
          resolve(result);
        } catch (err) {
          reject(err);
        }
      });

      // the result of the function must be saved in memory
      this.#cache.set(key, call);
    }

    // UnLock mutex
    this.#mutex.release();

    try {
      // Wait for the call to resolve or reject.
      const result = await call;

      // Lock mutex again to remove the cached promise from the map.
      await this.#mutex.acquire();
      // gives a cached value for the given key.
      // This is done inside the mutex lock so that we can be sure that no other code
      // accesses the cache while we are modifying it.
      this.#cache.delete(key);

      // UnLock mutex again.
      this.#mutex.release();

      // Return the result of the function.
      return result;
    } catch (err) {
      // Lock mutex again to remove the cached promise from the map.
      await this.#mutex.acquire();

      // in case of an error you need to clear the card just in case, it will help avoid problems
      this.#cache.delete(key);

      // UnLock mutex again.
      this.#mutex.release();
      throw err;
    }
  }
}
