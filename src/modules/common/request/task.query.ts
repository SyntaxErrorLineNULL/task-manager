/**
 * Author: SyntaxErrorLineNULL.
 */

import { ApiProperty } from '@nestjs/swagger';

export class TaskQuery {
  @ApiProperty({ enum: ['createAt-ASC', 'createAt-DESC', 'views-asc', 'views-desc', 'likes-asc', 'likes-desc'] })
  sort?: string;
  @ApiProperty()
  search?: string;
}
