'use strict';

/**
 * @interface
 * @memberof module:Adapters
 * Logger Adapter
 */
export class LoggerAdapter {
    constructor(options) {}

    /**
     * @param {String} message
     * @param { Array } values
     */
    Trace(message, ...values) {}

    /**
     * @param {String} message
     * @param { Array } values
     */
    Debug(message, ...values) {}

    /**
     * @param {String} message
     * @param { Array } values
     */
    Info(message, ...values) {}

    /**
     * @param {String} message
     * @param { Array } values
     */
    Warn(message, ...values) {}

    /**
     * @param {String} message
     * @param { Array } values
     */
    Error(message, ...values){}

    /**
     * @param { Object } mergingObject
     * @param { String } message
     * @param { Array } values
     */
    Fatal(mergingObject, message, ...values) {}
}
