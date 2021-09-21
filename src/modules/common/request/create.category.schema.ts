/**
 * Author: SyntaxErrorLineNULL.
 */

import { ApiProperty } from '@nestjs/swagger';

export default class CreateCategorySchema {
  @ApiProperty()
  readonly name: string;
}
