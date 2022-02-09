/**
 * Author: SyntaxErrorLineNULL.
 */

export class AuthorizationException extends Error {
  public static wrongSignIn(): AuthorizationException {
    return new AuthorizationException('Email or password is not correct');
  }

  public static wrongRegistration(): AuthorizationException {
    return new AuthorizationException('Your email is already in use. Or your account blocked');
  }

  public static wrongAuthorizationValidate(): AuthorizationException {
    return new AuthorizationException('Time your session is over');
  }

  public static wrongCompletionConfirmation(): AuthorizationException {
    return new AuthorizationException('Your token is not valid!');
  }

  public static wrongBlockedUser(): AuthorizationException {
    return new AuthorizationException('Your account is blocked');
  }
}
