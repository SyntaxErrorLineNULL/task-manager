'use strict';

import { LoggerService } from './logger.service.js';
import { Pino } from 'pino'
import { LOGGER_LEVELS } from "./levels.js";

export class Logger {
    /**
     * @param { Pino } _logger
     * @private
     */
    _logger;

    /**
     * @param { LoggerConfig } _config
     * @private
     */
    _config;

    /**
     * @param { LoggerConfig } config
     * @param { Pino } logger
     * @constructor
     */
    constructor(config, logger) {
        this._config = config;
        this._logger = logger;
    }

    /**
     * A map of levels
     */
    /*public get loadLevels(): Pino.LevelMapping {
        if (!this.config.enabled) {
            return STATIC_LEVELS
        }
        return this.pino.levels
    }*/

    /**
     * @param { string } level
     * @param { * } mergingObject
     * @param { string } message
     * @param { Array } values
     */
    _log(level, mergingObject, message, ...values) {
        if (values.length) {
            this._logger[level](mergingObject, message, ...values)
        } else if (message) {
            this._logger[level](mergingObject, message)
        } else {
            this._logger[level](mergingObject)
        }
    }

    trace(mergingObject, message, ...values) {
        this._log('trace', mergingObject, message, ...values)
    }

    debug(mergingObject, message, ...values) {
        this._log('debug', mergingObject, message, ...values)
    }

    info(mergingObject, message, ...values) {
        this._log('info', mergingObject, message, ...values)
    }

    warn(mergingObject, message, ...values) {
        this._log('warn', mergingObject, message, ...values)
    }

    error(mergingObject, message, ...values) {
        this._log('error', mergingObject, message, ...values)
    }

    fatal(mergingObject, message, ...values) {
        this._log('fatal', mergingObject, message, ...values)
    }
}