/**
 * Author: SyntaxErrorLineNULL.
 */

import { Module } from '@nestjs/common';
import { TaskController } from '../../api/controller/task.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import CategoryRepository from '../category/entity/category.repository';
import { TaskMapper } from '../common/mapper/task.mapper';
import { CategoryMapper } from '../common/mapper/category.mapper';
import { UserMapper } from '../common/mapper/user.mapper';
import { UserRepository } from '../user/entity/user.repository';
import { TaskService } from './service/task.service';
import { TaskRepository } from './repository/task.repository';

@Module({
  imports: [TypeOrmModule.forFeature([TaskRepository, CategoryRepository, UserRepository])],
  controllers: [TaskController],
  providers: [TaskService, TaskMapper, CategoryMapper, UserMapper],
})
export class TaskModule {}
