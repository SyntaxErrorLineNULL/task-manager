/**
 * Author: SyntaxErrorLineNULL.
 */
import { Task } from '../../task/entity/task.entity';
import { TaskDto } from '../dto/task.dto';
import { Injectable } from '@nestjs/common';
import { CategoryMapper } from './category.mapper';
import { UserMapper } from './user.mapper';
import { Category } from '../../category/entity/category.entity';

@Injectable()
export class TaskMapper {
  public constructor(private readonly categoryMapper: CategoryMapper, private readonly userMapper: UserMapper) {}

  public mapper(entity: Task): TaskDto {
    return new TaskDto(
      entity.id,
      entity.title,
      entity.description,
      entity.createAt.toString(),
      entity.finishAt ? entity.finishAt.toString() : null,
      entity.status,
      entity.categoryIds ? entity.categoryIds.map((cat: Category) => this.categoryMapper.mapper(cat)) : null,
      entity.user ? this.userMapper.mapper(entity.user) : null,
    );
  }
}
