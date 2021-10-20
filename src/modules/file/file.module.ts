/**
 * Author: SyntaxErrorLineNULL.
 */

import { Module } from '@nestjs/common';
import { FileController } from '../../api/controller/file.controller';
import { FileService } from './file.service';

@Module({
  imports: [],
  controllers: [FileController],
  exports: [FileService],
  providers: [FileService],
})
export class FileModule {}
