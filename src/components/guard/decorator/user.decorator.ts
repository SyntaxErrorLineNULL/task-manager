/**
 * Author: SyntaxErrorLineNULL.
 */

import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { Request } from 'express';
import { User } from '../../../modules/user/entity/user.entity';

export const UserAuth = createParamDecorator((data: keyof User, ctx: ExecutionContext) => {
  const user = ctx.switchToHttp().getRequest<Request>().user as User;
  return data ? user && user[data] : user;
});
