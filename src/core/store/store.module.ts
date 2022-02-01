import { Module } from '@nestjs/common';
import { StoreService } from './store.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigTypeormService } from '../../../config/config-typeorm.service';
import { RedisService } from './redis.service';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      useClass: ConfigTypeormService,
    }),
  ],
  providers: [StoreService, RedisService],
})
export class StoreModule {}
