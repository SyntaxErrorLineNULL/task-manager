import { Module } from '@nestjs/common';
import { DatabaseService } from './database.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigTypeormService } from '../../../config/config-typeorm.service';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      useClass: ConfigTypeormService,
    }),
  ],
  providers: [DatabaseService],
})
export class DatabaseModule {}
