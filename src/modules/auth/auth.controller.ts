import { Controller, Post, Body } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { SignUpDto } from '../common/dto/signUp.dto';
import { SignInDto } from '../common/dto/signIn.dto';
import { TokenDto } from '../common/dto/token.dto';

@ApiTags('Authentication')
@Controller('auth')
export class AuthController {
  constructor(private service: AuthService) {}

  @Post('sign-up')
  public async signUp(@Body() body: SignUpDto): Promise<void> {
    await this.service.signUp(body);
  }

  @Post('sign-in')
  public async signIn(@Body() body: SignInDto): Promise<TokenDto> {
    return await this.service.signIn(body);
  }
}
