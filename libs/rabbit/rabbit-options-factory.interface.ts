import { RabbitMQOptions } from './rabbitMQ-options.interface';

/**
 * Author: SyntaxErrorLineNULL.
 */

export interface RabbitOptionsFactory {
  createRabbitMQOptions(): RabbitMQOptions;
}
