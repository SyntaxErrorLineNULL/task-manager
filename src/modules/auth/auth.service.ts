import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { SignUpDto } from '../common/dto/signUp.dto';
import { SignInDto } from '../common/dto/signIn.dto';
import { PasswordService } from '../../application/service/password.service';
import { TokenDto } from '../common/dto/token.dto';
import { jwtConfig } from '../../../config/jwt.config';
import { JwtService } from '@nestjs/jwt';
import UserEntity from '../../application/entity/user.entity';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly passwordService: PasswordService,
    private readonly jwtService: JwtService,
  ) {}

  public async signUp(schema: SignUpDto): Promise<UserEntity> {
    const user = await this.userService.findByEmail(schema.email);
    if (user !== undefined) {
      throw new HttpException(
        'this email is already in use',
        HttpStatus.FORBIDDEN,
      );
    }
    return await this.userService.createUser(schema);
  }

  public async signIn(schema: SignInDto): Promise<TokenDto> {
    const user = await this.userService.findByEmail(schema.email);
    console.log(schema.password);
    const isPasswordValid = await bcrypt.compareSync(
      schema.password,
      user.passwordHash,
    );

    if (!user || !isPasswordValid) {
      throw new HttpException(
        'Password or email is not correct',
        HttpStatus.UNAUTHORIZED,
      );
    }
    return await this.generateJWTToken(user.id, user.email);
  }

  /**
   * @param id
   * @param email
   * @private
   */
  private async generateJWTToken(id: string, email: string): Promise<TokenDto> {
    return new TokenDto({
      expiresIn: jwtConfig.jwtExpirationTime,
      accessToken: await this.jwtService.signAsync({
        id: id,
        email: email,
        createAt: new Date(),
      }),
    });
  }
}
