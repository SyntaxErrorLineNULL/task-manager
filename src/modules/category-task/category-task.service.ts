/**
 * Author: SyntaxErrorLineNULL.
 */

import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import CategoryRepository from '../../application/repository/category.repository';
import CategoryEntity from '../../application/entity/category.entity';
import CreateCategorySchema from '../common/request/create.category.schema';

@Injectable()
export class CategoryTaskService {
  public constructor(
    @InjectRepository(CategoryRepository)
    private categoryRepository: CategoryRepository,
  ) {}

  public async create(entity: CreateCategorySchema): Promise<CategoryEntity> {
    const category = this.categoryRepository.create(entity);
    return await this.categoryRepository.save(category);
  }

  public async getAll(): Promise<CategoryEntity[]> {
    return await this.categoryRepository.getAll();
  }
}
