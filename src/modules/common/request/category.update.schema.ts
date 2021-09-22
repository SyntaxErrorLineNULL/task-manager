/**
 * Author: SyntaxErrorLineNULL.
 */

import { ApiProperty } from '@nestjs/swagger';

export class CategoryUpdateSchema {
  @ApiProperty()
  name?: string;
}
