/**
 * Author: SyntaxErrorLineNULL.
 */
import { EntityRepository, Repository } from 'typeorm';
import CategoryEntity from '../entity/category.entity';
import { NotFoundException } from '@nestjs/common';

@EntityRepository(CategoryEntity)
export default class CategoryRepository extends Repository<CategoryEntity> {
  public async getAll(): Promise<CategoryEntity[]> {
    return await this.find({ order: { id: 'DESC' } });
  }

  public async getById(id: string): Promise<CategoryEntity> {
    const category = await this.findOne({ where: { id } });
    if (category === null) {
      throw new NotFoundException(`Category with ID "${id}" is not found`);
    }
    return category;
  }
}
