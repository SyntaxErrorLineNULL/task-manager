/**
 * Author: SyntaxErrorLineNULL.
 */

import { EntityRepository, Repository } from 'typeorm';
import { SubTask } from '../entity/sub.task.entity';

@EntityRepository(SubTask)
export class SubTaskRepository extends Repository<SubTask> {}
