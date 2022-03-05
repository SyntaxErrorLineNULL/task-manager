/**
 * Author: SyntaxErrorLineNULL.
 */

import { Connection, Options } from 'amqplib';

export interface ConnectionAdapterInterface {
  /**
   * @throws ConnectionFailedException
   */
  connect(options: Options.Connect, socketOptions?: any): Promise<Connection>;
  /**
   * @throws ConnectionFailedException
   * @throws InvalidConnectionUrlException
   */
  connect(url: string, socketOptions?: any): Promise<Connection>;
}
