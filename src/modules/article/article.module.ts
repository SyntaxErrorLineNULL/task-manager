/**
 * Author: SyntaxErrorLineNULL.
 */

import { Module } from '@nestjs/common';
import { ArticleController } from '../../api/controller/article.controller';
import { ArticleService } from './article.service';

@Module({
  controllers: [ArticleController],
  providers: [ArticleService],
})
export class ArticleModule {}
