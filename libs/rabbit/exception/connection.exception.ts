/**
 * Author: SyntaxErrorLineNULL.
 */

export class ConnectionException extends Error {
  public static wrongValidate(): ConnectionException {
    return new ConnectionException('URL does not valid');
  }

  public static wrongConnection(message: string): ConnectionException {
    return new ConnectionException(message);
  }
}
