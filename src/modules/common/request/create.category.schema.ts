/**
 * Author: SyntaxErrorLineNULL.
 */

import { ApiProperty } from '@nestjs/swagger';

export class CreateCategorySchema {
  @ApiProperty()
  readonly name: string;
}
