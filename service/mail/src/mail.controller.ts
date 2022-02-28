import { Controller, Get } from '@nestjs/common';
import { MailService } from './mail.service';

@Controller()
export class MailController {
  constructor(private readonly mailService: MailService) {}

  @Get('send')
  async sendMail(): Promise<void> {
    await this.mailService.send('ligaj55078@naluzotan.com', 'data');
  }
}
