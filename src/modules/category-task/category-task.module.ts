/**
 * Author: SyntaxErrorLineNULL.
 */

import { Module } from '@nestjs/common';
import { CategoryTaskService } from './category-task.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import CategoryRepository from '../../application/repository/category.repository';
import { CategoryTaskController } from './category-task.controller';
import { CategoryMapper } from '../common/mapper/category.mapper';

@Module({
  imports: [TypeOrmModule.forFeature([CategoryRepository])],
  controllers: [CategoryTaskController],
  providers: [CategoryTaskService, CategoryMapper],
})
export class CategoryTaskModule {}
