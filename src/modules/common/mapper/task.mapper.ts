/**
 * Author: SyntaxErrorLineNULL.
 */
import TaskEntity from '../../../application/entity/task.entity';
import { TaskDto } from '../dto/task.dto';
import { Injectable } from '@nestjs/common';
import { CategoryMapper } from './category.mapper';
import { UserMapper } from './user.mapper';
import CategoryEntity from '../../../application/entity/category.entity';

@Injectable()
export class TaskMapper {
  public constructor(
    private readonly categoryMapper: CategoryMapper,
    private readonly userMapper: UserMapper,
  ) {}

  public mapper(entity: TaskEntity): TaskDto {
    return new TaskDto(
      entity.id,
      entity.title,
      entity.description,
      entity.createAt.toString(),
      entity.finishAt ? entity.finishAt.toString() : null,
      entity.status,
      entity.categoryIds
        ? entity.categoryIds.map((cat: CategoryEntity) => this.categoryMapper.mapper(cat))
        : null,
      entity.user ? this.userMapper.mapper(entity.user) : null,
    );
  }
}
