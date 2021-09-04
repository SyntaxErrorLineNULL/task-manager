/**
 * Author: SyntaxErrorLineNULL.
 */
import { ConfigService } from '@nestjs/config';
import { JwtModuleOptions, JwtOptionsFactory } from '@nestjs/jwt';
import { Injectable } from '@nestjs/common';

@Injectable()
export class ConfigJwtService implements JwtOptionsFactory {
  constructor(private readonly config: ConfigService) {}

  public async createJwtOptions(): Promise<JwtModuleOptions> {
    return {
      secret: this.config.get<string>('JWT_SECRET_KEY'),
      signOptions: {
        algorithm: this.config.get<string>('JWT_ALGORITHM'),
        expiresIn: this.config.get<number>('JWT_EXPIRATION_TIME'),
      },
    } as JwtModuleOptions;
  }
}
