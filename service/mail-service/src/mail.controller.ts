import { Controller, Get } from '@nestjs/common';
import { MailService } from './mail.service';

@Controller()
export class MailController {
  constructor(private readonly appService: MailService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
}
