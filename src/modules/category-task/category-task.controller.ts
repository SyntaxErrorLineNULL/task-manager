/**
 * Author: SyntaxErrorLineNULL.
 */

import { Body, Controller, Post, Get } from '@nestjs/common';
import { CategoryTaskService } from './category-task.service';
import CreateCategorySchema from '../common/request/create.category.schema';
import CategoryEntity from '../../application/entity/category.entity';

@Controller('category-task')
export class CategoryTaskController {
  public constructor(private service: CategoryTaskService) {}

  @Post('create')
  public async createCategoryTask(@Body() body: CreateCategorySchema): Promise<CategoryEntity> {
    return await this.service.create(body);
  }

  @Get('category-tasks')
  public async getAllCategory(): Promise<CategoryEntity[]> {
    return await this.service.getAll();
  }
}
