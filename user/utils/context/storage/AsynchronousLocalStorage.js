'use strict';

/*
 * AsynchronousLocalStorage
 *
 * (c) SyntaxErrorLineNULL
 */

import { AsyncLocalStorage } from 'async_hooks';

/**
 * @export
 * @class AsynchronousLocalStorage
 */
export class AsynchronousLocalStorage {
  /**
   * @param {AsynchronousLocalStorage} asyncLocaleStorage
   * @private
   */
  #asyncLocaleStorage;
  constructor () {
    this.#asyncLocaleStorage = new AsyncLocalStorage();
  }

  /**
   * @description Runs a function synchronously within a context and returns its return value.
   * The store is not accessible outside the callback function.
   * The store is accessible to any asynchronous operations created within the callback.
   * The optional args are passed to the callback function.
   * @link https://nodejs.org/api/async_context.html#asynclocalstoragerunstore-callback-args
   * @param { Object } context
   * @param { callback } callback
   * @returns { * }
   */
  async initStorage (context, callback) {
    const store = context ? new Map(Object.entries(context)) : new Map();

    this.#asyncLocaleStorage.run(store, () => {
      callback();
    });
  }

  /**
   * Get the current execution data from storage.
   * @link https://nodejs.org/api/async_context.html#asynclocalstoragegetstore
   * @param { string } key
   * @returns { ( Object | undefined ) }
   */
  get (key) {
    const store = this.#asyncLocaleStorage.getStore();
    return store?.get(key);
  }

  /**
   * @description Set the current execution data in storage.
   * @link https://nodejs.org/api/async_context.html#asynclocalstorageenterwithstore
   * @param { Object } context
   */
  create (context) {
    this.#asyncLocaleStorage.enterWith({ context });
  }
}
