/**
 * Author: SyntaxErrorLineNULL.
 */

import { Module } from '@nestjs/common';
import { CategoryService } from './category.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import CategoryRepository from './entity/category.repository';
import { CategoryController } from '../../api/controller/category.controller';
import { CategoryMapper } from '../common/mapper/category.mapper';

@Module({
  imports: [TypeOrmModule.forFeature([CategoryRepository])],
  controllers: [CategoryController],
  providers: [CategoryService, CategoryMapper],
})
export class CategoryModule {}
