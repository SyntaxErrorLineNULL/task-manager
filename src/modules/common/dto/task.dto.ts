/**
 * Author: SyntaxErrorLineNULL.
 */

import { ApiProperty } from '@nestjs/swagger';
import { TaskStatusEnum } from '../../task/entity/task.status.enum';
import { CategoryDto } from './category.dto';
import { UserDto } from './user.dto';

export class TaskDto {
  @ApiProperty()
  id: string;

  @ApiProperty()
  title: string;

  @ApiProperty()
  description: string;

  @ApiProperty({ type: 'timestamp' })
  createAt: string;

  @ApiProperty({ type: 'timestamp' })
  finishAt?: string;

  @ApiProperty({ enum: TaskStatusEnum })
  status: string;

  @ApiProperty()
  /**
   * @var CategoryDto[]
   */
  categoryIds?: CategoryDto[];

  @ApiProperty()
  user?: UserDto;

  /**
   * @param id
   * @param title
   * @param description
   * @param createAt
   * @param finishAt
   * @param status
   * @param categoryIds
   * @param user
   */
  public constructor(
    id: string,
    title: string,
    description: string,
    createAt: string,
    finishAt: string,
    status: string,
    categoryIds?: CategoryDto[],
    user?: UserDto,
  ) {
    this.id = id;
    this.title = title;
    this.description = description;
    this.createAt = createAt;
    this.finishAt = finishAt;
    this.status = status;
    this.categoryIds = categoryIds;
    this.user = user;
  }
}
