import { HttpException, HttpStatus } from '@nestjs/common';

export class NotFoundException extends HttpException {
  constructor() {
    super('Entity is not found', HttpStatus.FORBIDDEN);
  }
}
