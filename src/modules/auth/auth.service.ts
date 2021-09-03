import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { SignUpDto } from '../common/dto/signUp.dto';

@Injectable()
export class AuthService {
  constructor(private userService: UserService) {}

  public async signUp(schema: SignUpDto): Promise<void> {
    const user = this.userService.findByEmail(schema.email);
    user
      ? new HttpException('this email is already in use', HttpStatus.FORBIDDEN)
      : await this.userService.createUser(schema);
  }
}
