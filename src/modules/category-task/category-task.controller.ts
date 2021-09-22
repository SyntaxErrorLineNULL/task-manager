/**
 * Author: SyntaxErrorLineNULL.
 */

import { Body, Controller, Post, Get } from '@nestjs/common';
import { CategoryTaskService } from './category-task.service';
import CreateCategorySchema from '../common/request/create.category.schema';
import { CategoryDto } from '../common/dto/category.dto';
import { CategoryCollection } from '../common/dto/category.collection';

@Controller('category-task')
export class CategoryTaskController {
  public constructor(private service: CategoryTaskService) {}

  @Post('create')
  public async createCategoryTask(@Body() body: CreateCategorySchema): Promise<CategoryDto> {
    return await this.service.create(body);
  }

  @Get('category-tasks')
  public async getAllCategory(): Promise<CategoryCollection> {
    return await this.service.getAll();
  }
}
