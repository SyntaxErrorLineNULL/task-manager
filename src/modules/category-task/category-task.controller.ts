/**
 * Author: SyntaxErrorLineNULL.
 */

import { Body, Controller, Post, Get, Param, HttpStatus } from '@nestjs/common';
import { CategoryTaskService } from './category-task.service';
import CreateCategorySchema from '../common/request/create.category.schema';
import { CategoryDto } from '../common/dto/category.dto';
import { CategoryCollection } from '../common/dto/category.collection';
import { CategoryUpdateSchema } from '../common/request/category.update.schema';
import { ApiBody, ApiTags, ApiResponse, ApiParam } from '@nestjs/swagger';

@Controller('category')
@ApiTags('category')
export class CategoryTaskController {
  public constructor(private service: CategoryTaskService) {}

  @Post('create')
  @ApiBody({ type: [CreateCategorySchema] })
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'Create category',
    type: CategoryDto,
  })
  public async create(@Body() body: CreateCategorySchema): Promise<CategoryDto> {
    return await this.service.create(body);
  }

  @Get('category-list')
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Get all category',
    type: CategoryCollection,
  })
  public async getAllCategory(): Promise<CategoryCollection> {
    return await this.service.getAll();
  }

  @Post('remove/:id')
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'Remove category',
  })
  @ApiParam({
    name: 'id',
    required: true,
    schema: { oneOf: [{ type: 'string' }] },
  })
  public async remove(@Param('id') id: number): Promise<void> {
    await this.service.remove(id);
  }

  @Post('update/:id')
  @ApiBody({ type: [CategoryUpdateSchema] })
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'Single category',
    type: CategoryDto,
  })
  @ApiParam({
    name: 'id',
    required: true,
    schema: { oneOf: [{ type: 'string' }] },
  })
  public async update(
    @Body() body: CategoryUpdateSchema,
    @Param('id') id: number,
  ): Promise<CategoryDto> {
    return await this.service.update(id, body);
  }

  @Get('/:id')
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'Update category',
    type: CategoryDto,
  })
  @ApiParam({
    name: 'id',
    required: true,
    schema: { oneOf: [{ type: 'string' }] },
  })
  public async singleCategory(@Param('id') id: number): Promise<CategoryDto> {
    return await this.service.getById(id);
  }
}
