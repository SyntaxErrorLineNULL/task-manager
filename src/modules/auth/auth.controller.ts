import { Controller, Post, Body } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { SignUpDto } from '../common/dto/signUp.dto';

@ApiTags('Authentication')
@Controller('auth')
export class AuthController {
  constructor(private service: AuthService) {}

  @Post('sign-up')
  async signUp(@Body() body: SignUpDto): Promise<void> {
    await this.service.signUp(body);
  }
}
