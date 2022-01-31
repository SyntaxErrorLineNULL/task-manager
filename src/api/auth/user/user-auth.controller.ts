/**
 * Author: SyntaxErrorLineNULL.
 */

import { Controller, Post, Body } from '@nestjs/common';
import { GuardService } from '../../../components/guard/service/guard.service';
import { SignInDto } from '../dto/signin.dto';

@Controller('api/user-auth')
export class UserAuthController {
  constructor(private guardService: GuardService) {}

  @Post('sign-in')
  public async login(@Body() body: SignInDto): Promise<any> {
    return await this.guardService.login(body.email, body.password);
  }
}
