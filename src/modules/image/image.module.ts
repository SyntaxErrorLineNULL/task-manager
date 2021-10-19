/**
 * Author: SyntaxErrorLineNULL.
 */

import { Module } from '@nestjs/common';
import { FileService } from '../../application/service/file.service';
import { ImageController } from './image.controller';

@Module({
  imports: [],
  controllers: [ImageController],
  exports: [],
  providers: [FileService],
})
export class ImageModule {}
