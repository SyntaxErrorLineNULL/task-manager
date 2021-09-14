/**
 * Author: SyntaxErrorLineNULL.
 */

import {
  Controller,
  Post,
  Body,
  Get,
  UseGuards,
  HttpStatus,
  Res,
} from '@nestjs/common';
import { ApiBody, ApiTags, ApiResponse } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { SignUpDto } from '../common/dto/signUp.dto';
import { SignInDto } from '../common/dto/signIn.dto';
import { TokenDto } from '../common/dto/token.dto';
import UserEntity from '../../application/entity/user.entity';
import { JwtAuthGuard } from '../../core/guard/jwt-auth.guard';
import { ConfirmationAuthenticationDto } from '../common/dto/confirmation.authentication.dto';
import { Response } from 'express';
import { Authentication } from '../../core/decorator/user.decorator';

@ApiTags('Authentication')
@Controller('auth')
export class AuthController {
  constructor(private service: AuthService) {}

  @Post('sign-up')
  @ApiBody({ type: [SignUpDto] })
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'Registration user',
    type: UserEntity,
  })
  @ApiResponse({
    status: HttpStatus.FORBIDDEN,
    description: 'Forbidden',
  })
  public async signUp(@Body() body: SignUpDto): Promise<UserEntity> {
    return await this.service.signUp(body);
  }

  @Post('sign-in')
  @ApiBody({ type: [SignInDto] })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Successfully authentication',
    type: TokenDto,
  })
  @ApiResponse({
    status: HttpStatus.FORBIDDEN,
    description: 'Forbidden',
  })
  public async signIn(@Body() body: SignInDto): Promise<TokenDto> {
    return await this.service.signIn(body);
  }

  @Post('confirmation')
  @ApiBody({ type: [ConfirmationAuthenticationDto] })
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'your email is confirm',
  })
  public async confirmationAuth(
    @Body() body: ConfirmationAuthenticationDto,
    @Res() response: Response,
  ): Promise<Response> {
    await this.service.confirmationAuthentication(body);
    return response.status(HttpStatus.CREATED).json('your email is confirm');
  }

  @UseGuards(JwtAuthGuard)
  @Get('test')
  public test(@Authentication() auth): any {
    return auth;
  }
}
