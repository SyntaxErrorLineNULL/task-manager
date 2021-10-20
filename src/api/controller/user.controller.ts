/**
 * Author: SyntaxErrorLineNULL.
 */

import { Get, Controller } from '@nestjs/common';
import { User } from '../../modules/user/entity/user.entity';
import { UserService } from '../../modules/user/user.service';

@Controller('user')
export class UserController {
  constructor(private readonly service: UserService) {}

  @Get('users')
  public async getAllUsers(): Promise<User[]> {
    return this.service.getAll();
  }
}
