/**
 * Author: SyntaxErrorLineNULL.
 */

import { Controller, Post, Body, Get, UseGuards, HttpStatus, Res } from '@nestjs/common';
import { ApiBody, ApiTags, ApiResponse } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { SignUpSchema } from '../common/request/signUp.schema';
import { SignInSchema } from '../common/request/signIn.schema';
import { TokenSchema } from '../common/request/token.schema';
import { JwtAuthGuard } from '../../core/guard/jwt-auth.guard';
import { ConfirmationAuthenticationSchema } from '../common/request/confirmation.authentication.schema';
import { Response } from 'express';
import { Authentication } from '../../core/decorator/user.decorator';
import { UserDto } from '../common/dto/user.dto';

@ApiTags('Authentication')
@Controller('auth')
export class AuthController {
  public constructor(private service: AuthService) {}

  @Post('sign-up')
  @ApiBody({ type: [SignUpSchema] })
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'Registration user',
    type: UserDto,
  })
  @ApiResponse({
    status: HttpStatus.FORBIDDEN,
    description: 'Forbidden',
  })
  public async signUp(@Body() body: SignUpSchema): Promise<UserDto> {
    return await this.service.signUp(body);
  }

  @Post('sign-in')
  @ApiBody({ type: [SignInSchema] })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Successfully authentication',
    type: TokenSchema,
  })
  @ApiResponse({
    status: HttpStatus.FORBIDDEN,
    description: 'Forbidden',
  })
  public async signIn(@Body() body: SignInSchema): Promise<TokenSchema> {
    return await this.service.signIn(body);
  }

  @Post('confirmation')
  @ApiBody({ type: [ConfirmationAuthenticationSchema] })
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'your email is confirm',
  })
  public async confirmationAuth(
    @Body() body: ConfirmationAuthenticationSchema,
    @Res() response: Response,
  ): Promise<Response> {
    await this.service.confirmationAuthentication(body);
    return response.status(HttpStatus.CREATED).json('Your email is confirm');
  }

  @UseGuards(JwtAuthGuard)
  @Get('test')
  public test(@Authentication() auth): any {
    return auth;
  }
}
