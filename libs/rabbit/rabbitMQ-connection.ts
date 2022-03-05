/**
 * Author: SyntaxErrorLineNULL.
 */

import { connect, Connection, Channel } from 'amqplib';
import { RabbitMQOptions } from './rabbitMQ-options.interface';
import { ConnectionException } from './exception';

export class RabbitMQConnection {
  private REGEX = /^amqp|amqps:\/\/(.+):(.+)(@)([a-zA-Z0-9.:]+)$/g;
  private readonly uri: string;
  private connection: Connection;
  private _channel: Channel;

  constructor(options: RabbitMQOptions) {
    // TODO: later, use options and url
    this.isValid(options.url) ? (this.uri = options.url) : ConnectionException.wrongValidate();
  }

  protected async disconnect(): Promise<void> {
    await this._channel.close();
    return this.connection.close();
  }

  protected get channel() {
    return this._channel;
  }

  protected async connect(): Promise<Connection> {
    try {
      this.connection = await connect(this.uri);
    } catch (error) {
      ConnectionException.wrongConnection(error.message);
    }

    this._channel = await this.connection.createChannel();
    return this.connection;
  }

  private isValid(url: string): boolean {
    this.REGEX.lastIndex = 0;
    return this.REGEX.test(url);
  }
}
