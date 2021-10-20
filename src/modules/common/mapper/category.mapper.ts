/**
 * Author: SyntaxErrorLineNULL.
 */
import { Category } from '../../category/entity/category.entity';
import { CategoryDto } from '../dto/category.dto';
import { Injectable } from '@nestjs/common';

@Injectable()
export class CategoryMapper {
  public mapper(entity: Category): CategoryDto {
    return new CategoryDto(entity.id, entity.name);
  }
}
