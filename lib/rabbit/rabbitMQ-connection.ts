/**
 * Author: SyntaxErrorLineNULL.
 */

import { connect, Connection, Channel } from 'amqplib';

export class RabbitMQConnection {
  private readonly uri: string;
  private connection: Connection;
  private _channel: Channel;

  constructor() {
    this.uri = '';
  }

  protected async connect() {
    this.connection = await connect(this.uri);
    this._channel = await this.connection.createChannel();
  }

  protected async disconnect() {
    await this._channel.close();
    return this.connection.close();
  }

  protected get channel() {
    return this._channel;
  }
}
