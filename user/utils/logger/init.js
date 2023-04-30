import Pino from 'pino';

/**
 * Mapping pino timestamp formatters to keywords
 */
const TimestampFormatters = {
  iso: Pino.stdTimeFunctions.isoTime,
  epoch: Pino.stdTimeFunctions.epochTime,
  unix: Pino.stdTimeFunctions.unixTime
};

/**
 * Returns an instance of pino logger by adjusting the config options
 */
export const initLogger = (options) => {
  const pinoOptions = Object.assign({}, options);

  /**
     * Use pino formatters when a keyword is used
     */
  if (
    pinoOptions.timestamp &&
        typeof pinoOptions.timestamp === 'string' &&
        TimestampFormatters[pinoOptions.timestamp]
  ) {
    pinoOptions.timestamp = TimestampFormatters[pinoOptions.timestamp];
  }

  return options.stream ? Pino(pinoOptions, options.stream) : Pino(pinoOptions);
};
