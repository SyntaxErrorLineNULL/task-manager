/**
 * Author: SyntaxErrorLineNULL.
 */

import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import CategoryRepository from '../../application/repository/category.repository';
import CreateCategorySchema from '../common/request/create.category.schema';
import { CategoryMapper } from '../common/mapper/category.mapper';
import { CategoryDto } from '../common/dto/category.dto';
import { CategoryCollection } from '../common/dto/category.collection';
import { CategoryUpdateSchema } from '../common/request/category.update.schema';

@Injectable()
export class CategoryTaskService {
  public constructor(
    @InjectRepository(CategoryRepository)
    private readonly categoryRepository: CategoryRepository,
    private readonly categoryMapper: CategoryMapper,
  ) {}

  public async create(entity: CreateCategorySchema): Promise<CategoryDto> {
    const category = this.categoryRepository.create(entity);
    await this.categoryRepository.save(category);
    return this.categoryMapper.mapper(category);
  }

  public async getAll(): Promise<CategoryCollection> {
    const cat = await this.categoryRepository.getAll();
    const items = cat.map((cat) => this.categoryMapper.mapper(cat));
    return new CategoryCollection(items);
  }

  public async getById(categoryId: number): Promise<CategoryDto> {
    const cat = await this.categoryRepository.getById(categoryId);
    return this.categoryMapper.mapper(cat);
  }

  public async remove(categoryId: number): Promise<void> {
    const cat = await this.categoryRepository.getById(categoryId);
    await this.categoryRepository.remove(cat);
  }

  public async update(categoryId: number, schema: CategoryUpdateSchema): Promise<CategoryDto> {
    const cat = await this.categoryRepository.getById(categoryId);
    cat.name = schema.name;
    await this.categoryRepository.save(cat);
    return this.categoryMapper.mapper(cat);
  }
}
