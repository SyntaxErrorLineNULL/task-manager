/**
 * Author: SyntaxErrorLineNULL.
 */

export class AuthorizationException extends Error {
  public static wrongSignIn() {
    return new AuthorizationException('Email or password is not correct');
  }
}
