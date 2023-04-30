'use strict';

/**
 * MIT License
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy of this source code
 * and associated documentation files (the "Software"), to deal in the Software without restriction,
 * including without limitation the rights to use, copy, modify, merge, publish, distribute,
 * sublicense and/or sell copies of the Software,
 * and to permit persons to whom the Software is furnished to do so, subject to the following conditions:
 *
 * The above license notice and this permission notice shall be included in all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED,
 * INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.
 * IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
 * DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
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
    constructor(logger) {
        this.#logger = logger;
    }

    /**
     * @param { string } level
     * @param { string } message
     * @param { Array } values
     */
    #log(level, message, ...values) {
        if (values.length) {
            this.#logger[level](message, ...values)
        } else if (message) {
            this.#logger[level](message)
        }
    }

    Trace(message, ...values) {
        this.#log('trace', message, ...values)
    }

    Debug(message, ...values) {
        this.#log('debug', message, ...values)
    }

    Info(message, ...values) {
        this.#log('info', message, ...values)
    }

    Warn(message, ...values) {
        this.#log('warn', message, ...values)
    }

    Error(message, ...values) {
        this.#log('error', message, ...values)
    }

    Fatal(mergingObject, message, ...values) {
        this.#log('fatal', message, ...values)
    }
}