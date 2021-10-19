/**
 * Author: SyntaxErrorLineNULL.
 */

import { Controller, UploadedFile, Post, UseInterceptors } from '@nestjs/common';
import { ApiTags, ApiConsumes, ApiBody } from '@nestjs/swagger';
import { FileService } from '../../application/service/file.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { multerOptions } from '../../../config/multer.service';

@Controller('/api/image')
@ApiTags('Image')
export class ImageController {
  constructor(private readonly fileService: FileService) {}

  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        file: {
          type: 'string',
          format: 'binary',
        },
      },
    },
  })
  @Post()
  @UseInterceptors(FileInterceptor('file', multerOptions))
  public async uploadFile(@UploadedFile() file: Express.Multer.File) {
    console.log(file);
  }
}
