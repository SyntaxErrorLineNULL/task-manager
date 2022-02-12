/**
 * Author: SyntaxErrorLineNULL.
 */

import { Controller, Inject, Get } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { Observable } from 'rxjs';

@Controller('gateway')
export class AppController {
  constructor(@Inject('TEST_SERVICE') private testService: ClientProxy) {}

  @Get('test')
  async getHello() {
    return await this.testService.send('get_hello', {});
  }
}
