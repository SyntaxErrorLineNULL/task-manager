/**
 * Author: SyntaxErrorLineNULL.
 */

import {
  HttpException,
  HttpStatus,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { UserService } from '../user/user.service';
import { SignUpSchema } from '../common/request/signUp.schema';
import { SignInSchema } from '../common/request/signIn.schema';
import { TokenSchema } from '../common/request/token.schema';
import { jwtConfig } from '../../../config/jwt.config';
import { JwtService } from '@nestjs/jwt';
import UserEntity from '../../application/entity/user.entity';
import * as bcrypt from 'bcryptjs';
import { UserStatusEnum } from '../../application/entity/user.status.enum';
import { MailService } from '../../core/mail/mail.service';
import { ConfirmationAuthenticationSchema } from '../common/request/confirmation.authentication.schema';

@Injectable()
export class AuthService {
  public constructor(
    private readonly userService: UserService,
    private readonly mailService: MailService,
    private readonly jwtService: JwtService,
  ) {}

  public async signUp(schema: SignUpSchema): Promise<UserEntity> {
    const user = await this.userService.findByEmail(schema.email);
    if (user !== undefined) {
      throw new HttpException(
        'this email is already in use',
        HttpStatus.FORBIDDEN,
      );
    }

    const token =
      Math.random().toString(36).substring(2, 5) +
      Math.random().toString(36).substring(2, 5);

    await this.mailService.send(schema.email, 'Welcome', './index', {
      name: schema.name,
      token: token,
    });
    return await this.userService.createUser(schema, token);
  }

  public async signIn(schema: SignInSchema): Promise<TokenSchema> {
    const user = await this.userService.findByEmail(schema.email);
    const isPasswordValid = await bcrypt.compareSync(
      schema.password,
      user.passwordHash,
    );

    if (!user || !isPasswordValid || user.status !== UserStatusEnum.STATUS_ACTIVE) {
      throw new HttpException(
        'Password or email is not correct. Or your account is not confirmation',
        HttpStatus.UNAUTHORIZED,
      );
    }
    return await this.generateJWTToken(user);
  }

  public async confirmationAuthentication(
    schema: ConfirmationAuthenticationSchema,
  ): Promise<void> {
    await this.userService.confirmationToken(schema.token);
  }

  /**
   * @private
   * @param user
   */
  private async generateJWTToken(user: UserEntity): Promise<TokenSchema> {
    const payload = { userId: user.id };
    return new TokenSchema({
      expiresIn: jwtConfig.jwtExpirationTime,
      accessToken: await this.jwtService.signAsync(payload),
    });
  }

  public async validate(id: string): Promise<UserEntity> {
    const user = await this.userService.getById(id);
    if (!user || user.status !== UserStatusEnum.STATUS_ACTIVE) {
      throw new UnauthorizedException();
    }

    return user;
  }
}
