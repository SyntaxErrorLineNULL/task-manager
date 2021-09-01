/**
 * Author: SyntaxErrorLineNULL.
 */

import { Module } from '@nestjs/common';
import { TaskModule } from './modules/task/task.module';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeORMConfig } from '../config/typeorm.config';
import { UserModule } from './modules/user/user.module';
import { AuthModule } from './modules/auth/auth.module';
import { CategoryTaskModule } from './modules/category-task/category-task.module';
import { CategoryTaskController } from './modules/category-task/category-task.controller';
import TaskEntity from "./application/entity/task.entity";
import UserEntity from "./application/entity/user.entity";
import CategoryEntity from "./application/entity/category.entity";

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
    }),
    TypeOrmModule.forFeature([TaskEntity, UserEntity, CategoryEntity]),
    TypeOrmModule.forRoot(typeORMConfig),
    TaskModule,
    UserModule,
    AuthModule,
    CategoryTaskModule,
  ],
  controllers: [CategoryTaskController],
})
export class AppModule {}
