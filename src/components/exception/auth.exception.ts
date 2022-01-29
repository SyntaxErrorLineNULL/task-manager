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

  public static wrongConfirmationValidate(): AuthorizationException {
    return new AuthorizationException('Password is not correct. Maybe... . Check your inbox, you may not have noticed the message that your account has been blocked');
  }
}
