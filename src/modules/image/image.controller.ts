/**
 * Author: SyntaxErrorLineNULL.
 */

import { Controller, UploadedFile, Post, UseInterceptors } from '@nestjs/common';
import { ApiTags, ApiConsumes, ApiBody } from '@nestjs/swagger';
import { FileInterceptor } from '@nestjs/platform-express';
import { multerOptions } from '../../../config/multer.service';

@Controller('/api/image')
@ApiTags('Image')
export class ImageController {
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
