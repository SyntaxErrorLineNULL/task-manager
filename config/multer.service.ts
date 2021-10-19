/**
 * Author: SyntaxErrorLineNULL.
 */

import { extname } from 'path';
import { MulterOptions } from '@nestjs/platform-express/multer/interfaces/multer-options.interface';
import { diskStorage } from 'multer';
import { generateString } from '@nestjs/typeorm';
import { HttpException, HttpStatus } from '@nestjs/common';

export const multerOptions: MulterOptions = {
  fileFilter(
    req: Express.Request,
    file: {
      fieldname: string;
      originalname: string;
      encoding: string;
      mimetype: string;
      size: number;
      destination: string;
      filename: string;
      path: string;
      buffer: Buffer;
    },
    callback: (error: Error | null, acceptFile: boolean) => void,
  ) {
    if (file.mimetype.match(/\/(jpg|jpeg|png|gif|doc|docs|pdf)$/)) {
      callback(null, true);
    } else {
      callback(new HttpException(`Unsupported file type ${extname(file.originalname)}`, HttpStatus.BAD_REQUEST), false);
    }
  },
  storage: diskStorage({
    destination: './uploads',
    filename(
      req: Express.Request,
      file: Express.Multer.File,
      callback: (error: Error | null, filename: string) => void,
    ) {
      const fileName = generateString();
      callback(null, `${fileName}${extname(file.originalname)}`);
    },
  }),
};
