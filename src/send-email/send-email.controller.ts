import { Body, Controller, Post } from '@nestjs/common';
import { SendEmailService } from './send-email.service';
import { MessageDto } from './dto/message.dto';

@Controller('send-email')
export class SendEmailController {
  constructor(private readonly sendEmailService: SendEmailService) {

  }
  @Post()
  sendEmail(@Body() messageDto: MessageDto) {
    return this.sendEmailService.sendEmail(messageDto);
  }
}