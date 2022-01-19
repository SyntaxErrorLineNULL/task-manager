/**
 * Author: SyntaxErrorLineNULL.
 */

import { DynamicModule, Module, Provider } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { MailModule } from '../../core/mail/mail.module';
import { JwtModule } from '@nestjs/jwt';
import { jwtConfig } from '../../../config/jwt.config';
import { GuardService } from './service/guard.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserRepository } from '../../modules/user/entity/user.repository';
import { JwtStrategy } from './jwt/jwt.strategy';
import { GuardModuleAsyncOptions } from './interface/guard-module-async.options';
import { GuardModuleOptions } from './guard-module.options.class';
import { GuardOptionsFactory } from './interface/guard-module.factory';
import { GUARD_DATA_PROVIDER } from './provider/guard.provider';
import { PasswordService } from './service/password.service';

@Module({
  imports: [
    PassportModule,
    MailModule,
    JwtModule.register({
      secret: jwtConfig.secret,
      signOptions: {
        algorithm: 'HS512',
        expiresIn: jwtConfig.jwtExpirationTime,
      },
      verifyOptions: {
        algorithms: ['HS512'],
      },
    }),
    TypeOrmModule.forFeature([UserRepository]),
  ],
  providers: [
    GuardService,
    JwtStrategy,
    {
      provide: GUARD_DATA_PROVIDER,
      useClass: GuardService,
    },
    PasswordService,
  ],
  exports: [JwtModule, PasswordService],
})
export class GuardModule {
  public static registerAsync(options: GuardModuleAsyncOptions): DynamicModule {
    return {
      module: GuardModule,
      imports: options.imports || [],
      providers: this.createAsyncProviders(options),
      exports: [],
    };
  }

  private static createAsyncProviders(options: GuardModuleAsyncOptions): Provider[] {
    if (options.useExisting || options.useFactory) {
      return [this.createAsyncOptionsProvider(options)];
    }
    return [
      this.createAsyncOptionsProvider(options),
      {
        provide: options.useClass,
        useClass: options.useClass,
      },
    ];
  }

  private static createAsyncOptionsProvider(options: GuardModuleAsyncOptions): Provider {
    if (options.useFactory) {
      return {
        provide: GuardModuleOptions,
        useFactory: options.useFactory,
        inject: options.inject || [],
      };
    }
    return {
      provide: GuardModuleOptions,
      useFactory: async (optionsFactory: GuardOptionsFactory) => await optionsFactory.createGuardOptions(),
      inject: [options.useExisting || options.useClass],
    };
  }
}
