/**
 * Author: SyntaxErrorLineNULL.
 */

export class ConnectionException extends Error {
  constructor() {
    super();
    this.message = 'Connection Refused';
  }
}
