/**
 * Author: SyntaxErrorLineNULL.
 */

export class TokenException extends Error {
  public static tokenIsNotExists(): TokenException {
    return new TokenException('This token is not found or not valid');
  }

  public static tokenSent(): TokenException {
    return new TokenException('Time to send a new token has not passed');
  }
}
