/**
 * Author: SyntaxErrorLineNULL.
 */

import { Module } from '@nestjs/common';
import { TaskController } from './task.controller';
import { TaskService } from './task.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TaskRepository } from '../../application/repository/task.repository';
import CategoryRepository from '../../application/repository/category.repository';

@Module({
  imports: [TypeOrmModule.forFeature([TaskRepository, CategoryRepository])],
  controllers: [TaskController],
  providers: [TaskService],
})
export class TaskModule {}
