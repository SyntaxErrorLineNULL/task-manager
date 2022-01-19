/**
 * Author: SyntaxErrorLineNULL.
 */

import { ArgumentsHost, Catch, ExceptionFilter, HttpStatus } from '@nestjs/common';
import { Response } from 'express';
import { AuthorizationException } from '../exception/auth.exception';

@Catch(AuthorizationException)
export class AuthorizationExceptionHandler implements ExceptionFilter {
  catch(exception: any, host: ArgumentsHost): any {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();

    response.status(HttpStatus.UNAUTHORIZED).json({
      message: exception.message,
    });
  }
}
