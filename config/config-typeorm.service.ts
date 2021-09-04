/**
 * Author: SyntaxErrorLineNULL.
 */
import { TypeOrmOptionsFactory, TypeOrmModuleOptions } from '@nestjs/typeorm';
import { ConfigService } from '@nestjs/config';
import { Injectable } from '@nestjs/common';

@Injectable()
export class ConfigTypeormService implements TypeOrmOptionsFactory {
  constructor(private readonly config: ConfigService) {}

  public async createTypeOrmOptions(): Promise<TypeOrmModuleOptions> {
    return {
      type: this.config.get<any>('DB_CONNECTION'),
      host: this.config.get<string>('DB_HOST'),
      port: this.config.get<number>('DB_PORT'),
      username: this.config.get<string>('DB_USER'),
      password: this.config.get<string>('DB_PASSWORD'),
      database: this.config.get<string>('DB_NAME'),
      entities: [__dirname + '/src/application/entity/*.entity.ts'],
      synchronize: this.config.get<boolean>('DB_SYNCHRONIZE'),
      autoLoadEntities: true,
      logging: this.config.get<boolean>('APP_STATUS_DEV')
        ? false
        : ['query', 'error', 'schema'],
      extra: {
        connectionLimit: 5,
      },
    };
  }
}
