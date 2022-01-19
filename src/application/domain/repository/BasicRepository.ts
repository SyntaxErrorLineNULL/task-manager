/**
 * Author: SyntaxErrorLineNULL.
 */
import { BaseEntity } from 'typeorm';

export interface BasicRepository {
  findById(id: string): Promise<BaseEntity>;

  findAll(): Promise<BaseEntity[]>;

  add(entity: BaseEntity): Promise<void>;

  remove(entity: BaseEntity): Promise<void>;
}
