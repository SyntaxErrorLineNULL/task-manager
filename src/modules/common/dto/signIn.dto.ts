/**
 * Author: SyntaxErrorLineNULL.
 */

import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsEmail } from 'class-validator';
import { IsPassword } from '../../../core/validator/password.decorator';

export class SignInDto {
  @IsNotEmpty()
  @IsEmail()
  @ApiProperty()
  readonly email: string;

  @ApiProperty()
  @IsPassword()
  readonly password: string;
}
