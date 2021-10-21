/**
 * Author: SyntaxErrorLineNULL.
 */
import { Task } from '../../task/entity/task.entity';
import { TaskDto } from '../dto/task.dto';
import { Injectable } from '@nestjs/common';
import { CategoryMapper } from './category.mapper';
import { UserMapper } from './user.mapper';
import { Category } from '../../category/entity/category.entity';
import { UserRepository } from '../../user/entity/user.repository';

@Injectable()
export class TaskMapper {
  public constructor(
    private readonly categoryMapper: CategoryMapper,
    private readonly userMapper: UserMapper,
    private readonly userRepository: UserRepository,
  ) {}

  public async mapper(entity: Task): Promise<TaskDto> {
    const user = await this.userRepository.getUserById(entity.authorId);
    return new TaskDto(
      entity.id,
      entity.title,
      entity.description,
      entity.createAt.toString(),
      entity.finishAt ? entity.finishAt.toString() : null,
      entity.status,
      entity.categoryIds ? entity.categoryIds.map((cat: Category) => this.categoryMapper.mapper(cat)) : null,
      this.userMapper.mapper(user),
    );
  }
}
