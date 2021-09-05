/**
 * Author: SyntaxErrorLineNULL.
 */

import { Get, Controller } from '@nestjs/common';
import UserEntity from '../../application/entity/user.entity';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private readonly service: UserService) {}

  @Get('users')
  public async getAllUsers(): Promise<UserEntity[]> {
    return this.service.getAll();
  }
}
