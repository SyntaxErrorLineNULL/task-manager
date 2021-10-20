/**
 * Author: SyntaxErrorLineNULL.
 */

import { BaseEntity, Column, CreateDateColumn, Entity, JoinTable, ManyToMany, PrimaryColumn } from 'typeorm';
import { v4 as uuidv4 } from 'uuid';
import { Category } from '../../category/entity/category.entity';

@Entity({ name: 'article' })
export default class ArticleEntity extends BaseEntity {
  @PrimaryColumn({ type: 'uuid' })
  id: string;

  @Column({ type: 'string', length: 35 })
  title: string;

  @Column({ type: 'text' })
  content: string;

  @Column({ type: 'integer', default: 0 })
  likes: number;

  @Column({ type: 'integer', default: 0 })
  views: number;

  @CreateDateColumn({ type: 'timestamp', name: 'createAt' })
  createAt: Date;

  @ManyToMany(() => Category)
  @JoinTable()
  categoryIds?: Category[];

  @Column({ type: 'text' })
  coverId?: string;

  constructor(title: string, content: string, coverId: string) {
    super();
    this.id = uuidv4();
    this.title = title;
    this.content = content;
    this.coverId = coverId;
    this.createAt = new Date();
  }
}
