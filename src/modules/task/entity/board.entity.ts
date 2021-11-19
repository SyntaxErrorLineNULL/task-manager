/**
 * Author: SyntaxErrorLineNULL.
 */

import { BaseEntity, Column, Entity } from 'typeorm';
import { Visibility } from './visibility.enum';

@Entity()
export class Board extends BaseEntity {
  @Column({ type: 'uuid' })
  id: string;

  @Column()
  name: string;

  @Column({ type: 'uuid' })
  authorId: string;

  @Column()
  imageId?: string;

  @Column({ type: 'enum', enum: Visibility, default: Visibility.VISIBILITY_PUBLIC })
  visibility: Visibility;
}
