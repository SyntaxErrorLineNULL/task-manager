/**
 * Author: SyntaxErrorLineNULL.
 */

import { Module } from '@nestjs/common';
import { FileService } from './file.service';

@Module({
  imports: [],
  controllers: [],
  exports: [FileService],
  providers: [FileService],
})
export class FileModule {}
