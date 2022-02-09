/**
 * Author: SyntaxErrorLineNULL.
 */

import { Controller, Post, Body } from '@nestjs/common';
import { GuardService } from '../../../components/guard/service/guard.service';
import { SignInDto } from '../dto/signin.dto';
import { RedisService } from '../../../core/store/redis-service';
import { UserRepository } from '../../../modules/user/entity/user.repository';
import { AuthorizationException } from '../../../components/exception/auth.exception';
import { SignUpDto } from '../dto/sign-up.dto';
import { PasswordService } from '../../../components/guard/service/password.service';
import { TokenService } from '../../../components/guard/service/token.service';
import { UserService } from '../../../modules/user/user.service';
import { ConfirmationDto } from '../dto/confirmation.dto';

@Controller('api/user/auth')
export class UserAuthController {
  constructor(
    private guardService: GuardService,
    private redis: RedisService,
    private userRepository: UserRepository,
    private passwordService: PasswordService,
    private tokenService: TokenService,
    private userService: UserService,
  ) {}

  @Post('sign-up')
  public async signUp(@Body() body: SignUpDto) {
    if (await this.userRepository.findOne({ email: body.email })) {
      throw AuthorizationException.wrongRegistration();
    }
    await this.userService.createUser(body);
    await this.tokenService.sendConfirmationToken(body.email, body.name);
  }

  @Post('confirmation')
  public async completionConfirmation(@Body() body: ConfirmationDto) {
    await this.tokenService.completionConfirmation(body.token);
  }

  @Post('sign-in')
  public async login(@Body() body: SignInDto): Promise<any> {
    return await this.guardService.login(body.email, body.password);
  }
}
