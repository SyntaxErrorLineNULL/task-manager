/**
 * Author: SyntaxErrorLineNULL.
 */

import { Module } from '@nestjs/common';
import { TaskController } from '../../api/controller/task.controller';
import { TaskService } from './task.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TaskRepository } from './entity/task.repository';
import CategoryRepository from '../category/entity/category.repository';
import { TaskMapper } from '../common/mapper/task.mapper';
import { CategoryMapper } from '../common/mapper/category.mapper';
import { UserMapper } from '../common/mapper/user.mapper';
import { UserRepository } from '../user/entity/user.repository';

@Module({
  imports: [TypeOrmModule.forFeature([TaskRepository, CategoryRepository, UserRepository])],
  controllers: [TaskController],
  providers: [TaskService, TaskMapper, CategoryMapper, UserMapper],
})
export class TaskModule {}
