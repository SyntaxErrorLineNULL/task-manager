/**
 * Author: SyntaxErrorLineNULL.
 */

import { ApiProperty } from '@nestjs/swagger';

export class UpdateTaskSchema {
  @ApiProperty()
  readonly title?: string;

  @ApiProperty()
  readonly description?: string;
}
