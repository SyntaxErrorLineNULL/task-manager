/**
 * Author: SyntaxErrorLineNULL.
 */

import { ApiProperty } from '@nestjs/swagger';

export default class CreateCategoryDto {
  @ApiProperty()
  readonly name: string;
}
