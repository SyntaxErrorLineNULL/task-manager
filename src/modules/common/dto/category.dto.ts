/**
 * Author: SyntaxErrorLineNULL.
 */

import { ApiProperty } from '@nestjs/swagger';

export class CategoryDto {
  @ApiProperty()
  id: number;

  @ApiProperty()
  name: string;

  public constructor(id: number, name: string) {
    this.id = id;
    this.name = name;
  }
}
