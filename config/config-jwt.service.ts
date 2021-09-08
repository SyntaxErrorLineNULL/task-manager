/**
 * Author: SyntaxErrorLineNULL.
 */
import { ConfigService } from '@nestjs/config';
import { JwtModuleOptions, JwtOptionsFactory } from '@nestjs/jwt';
import { Injectable } from '@nestjs/common';

@Injectable()
export class ConfigJwtService implements JwtOptionsFactory {
  constructor(private readonly config: ConfigService) {}

  createJwtOptions(): JwtModuleOptions {
    return {
      secret: this.config.get('JWT_SECRET'),
      signOptions: {
        expiresIn: this.config.get('JWT_EXPIRATION_TIME'),
      },
      verifyOptions: {
        algorithms: this.config.get('JWT_ALGORITHM'),
      },
    };
  }
}
