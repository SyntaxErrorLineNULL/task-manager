'use strict';

/*
 * logger wrapper
 *
 * (c) SyntaxErrorLineNULL
 */

export class Logger {
  /**
     * @param _logger
     * @private
     */
  #logger;

  /**
     * @param logger
     * @constructor
     */
  constructor (logger) {
    this.#logger = logger;
  }

  /**
     * @param { string } level
     * @param { string } message
     * @param { Array } values
     */
  #log (level, message, ...values) {
    if (values.length) {
      this.#logger[level](message, ...values);
    } else if (message) {
      this.#logger[level](message);
    }
  }

  trace (message, ...values) {
    this.#log('trace', message, ...values);
  }

  debug (message, ...values) {
    this.#log('debug', message, ...values);
  }

  info (message, ...values) {
    this.#log('info', message, ...values);
  }

  warn (message, ...values) {
    this.#log('warn', message, ...values);
  }

  error (message, ...values) {
    this.#log('error', message, ...values);
  }

  fatal (mergingObject, message, ...values) {
    this.#log('fatal', message, ...values);
  }
}
