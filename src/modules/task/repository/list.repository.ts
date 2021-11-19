/**
 * Author: SyntaxErrorLineNULL.
 */

import { EntityRepository, Repository } from 'typeorm';
import { List } from '../entity/list.entity';

@EntityRepository()
export class ListRepository extends Repository<List> {}
