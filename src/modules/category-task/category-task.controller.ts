/**
 * Author: SyntaxErrorLineNULL.
 */

import { Body, Controller, Post, Get } from '@nestjs/common';
import { CategoryTaskService } from './category-task.service';
import CreateCategoryDto from '../common/dto/create.category.dto';
import CategoryEntity from '../../application/entity/category.entity';

@Controller('category-task')
export class CategoryTaskController {
  constructor(private service: CategoryTaskService) {}

  @Post('create')
  createCategoryTask(@Body() body: CreateCategoryDto): Promise<CategoryEntity> {
    return this.service.create(body);
  }

  @Get('category-tasks')
  getAllCategory(): Promise<CategoryEntity[]> {
    return this.service.getAll();
  }
}
