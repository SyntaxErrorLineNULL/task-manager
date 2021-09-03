/**
 * Author: SyntaxErrorLineNULL.
 */

import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import CategoryRepository from '../../application/repository/category.repository';
import CategoryEntity from '../../application/entity/category.entity';
import CreateCategoryDto from '../common/dto/create.category.dto';

@Injectable()
export class CategoryTaskService {
  constructor(
    @InjectRepository(CategoryRepository)
    private categoryRepository: CategoryRepository,
  ) {}

  async create(entity: CreateCategoryDto): Promise<CategoryEntity> {
    const category = this.categoryRepository.create(entity);
    return await this.categoryRepository.save(category);
  }

  async getAll(): Promise<CategoryEntity[]> {
    return await this.categoryRepository.getAll();
  }
}
