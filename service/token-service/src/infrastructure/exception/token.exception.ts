/**
 * Author: SyntaxErrorLineNULL.
 */

export class TokenException extends Error {
  public static tokenIsNotExists(): TokenException {
    return new TokenException('This token is not found or not valid');
  }
}
