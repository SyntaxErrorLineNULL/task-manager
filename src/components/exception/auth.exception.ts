/**
 * Author: SyntaxErrorLineNULL.
 */

export class AuthorizationException extends Error {
  public static wrongSignIn(): AuthorizationException {
    return new AuthorizationException('Email or password is not correct');
  }

  public static wrongRegistration(): AuthorizationException {
    return new AuthorizationException('');
  }
}
