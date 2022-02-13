/**
 * Author: SyntaxErrorLineNULL.
 */

import { ArgumentsHost, Catch, ExceptionFilter, HttpStatus } from '@nestjs/common';
import { TokenException } from './token.exception';
import { Response } from 'express';

@Catch(TokenException)
export class TokenExceptionHandler implements ExceptionFilter {
  catch(exception: any, host: ArgumentsHost): any {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();

    response.status(HttpStatus.FORBIDDEN).json({
      message: exception.message,
    });
  }
}
