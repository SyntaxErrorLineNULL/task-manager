/**
 * Author: SyntaxErrorLineNULL.
 */

import { Connection, Options } from 'amqplib';

export interface ConnectionAdapterInterface {
  /**
   * @throws ConnectionFailedException
   * @throws ConnectionFailedException
   * @throws InvalidConnectionUrlException
   */
  connect(url: string, options?: Options.Connect, socketOptions?: any): Promise<Connection>;

  disconnect(): Promise<void>;
}
