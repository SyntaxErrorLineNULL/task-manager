/**
 * Author: SyntaxErrorLineNULL.
 */

import { TaskDto } from './task.dto';
import { ApiProperty } from '@nestjs/swagger';

export class TaskCollection {
  @ApiProperty({ type: TaskDto })
  items: TaskDto[];

  /**
   * @param items
   */
  public constructor(items: TaskDto[]) {
    this.items = items;
  }
}
