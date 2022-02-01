/**
 * Author: SyntaxErrorLineNULL.
 */

import { Get, Controller, UseGuards } from '@nestjs/common';
import { User } from '../../modules/user/entity/user.entity';
import { UserService } from '../../modules/user/user.service';
import { JwtAuthGuard } from '../../components/guard/jwt/jwt-auth.guard';

@Controller('user')
@UseGuards(JwtAuthGuard)
export class UserController {
  constructor(private readonly service: UserService) {}

  @Get('users')
  public async getAllUsers(): Promise<User[]> {
    return this.service.getAll();
  }
}
