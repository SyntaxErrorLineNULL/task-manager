/**
 * Author: SyntaxErrorLineNULL.
 */

import { Module } from '@nestjs/common';
import { ImageController } from './image.controller';

@Module({
  imports: [],
  controllers: [ImageController],
  exports: [],
  providers: [],
})
export class ImageModule {}
