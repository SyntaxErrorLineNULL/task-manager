/**
 * Author: SyntaxErrorLineNULL.
 */
import { CategoryDto } from './category.dto';
import { ApiProperty } from '@nestjs/swagger';

export class CategoryCollection {
  @ApiProperty()
  items: CategoryDto[];

  public constructor(items: CategoryDto[]) {
    this.items = items;
  }
}
