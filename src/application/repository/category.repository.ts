/**
 * Author: SyntaxErrorLineNULL.
 */
import { EntityRepository, Repository } from 'typeorm';
import CategoryEntity from '../entity/category.entity';

@EntityRepository(CategoryEntity)
export default class CategoryRepository extends Repository<CategoryEntity> {
  async getAll(): Promise<CategoryEntity[]> {
    return await this.find({ order: { id: 'DESC' } });
  }
}
