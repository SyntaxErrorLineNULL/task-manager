/**
 * Author: SyntaxErrorLineNULL.
 */
import { EntityRepository, Repository } from 'typeorm';
import { Category } from './category.entity';
import { NotFoundException } from '@nestjs/common';

@EntityRepository(Category)
export default class CategoryRepository extends Repository<Category> {
  public async getAll(): Promise<Category[]> {
    return await this.find({ order: { id: 'DESC' } });
  }

  public async getById(id: number): Promise<Category> {
    const category = await this.findOne({ where: { id } });
    if (category === null) {
      throw new NotFoundException(`Category with ID "${id}" is not found`);
    }
    return category;
  }
}
