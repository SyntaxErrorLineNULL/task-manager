/**
 * Author: SyntaxErrorLineNULL.
 */
import CategoryEntity from '../../../application/entity/category.entity';
import { CategoryDto } from '../dto/category.dto';
import { Injectable } from '@nestjs/common';

@Injectable()
export class CategoryMapper {
  public mapper(entity: CategoryEntity): CategoryDto {
    return new CategoryDto(entity.id, entity.name);
  }
}
