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
}
