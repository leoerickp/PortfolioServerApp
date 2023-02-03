import { Module } from '@nestjs/common';
import { SendEmailService } from './send-email.service';
import { SendEmailController } from './send-email.controller';
import { MailModule } from '../mail/mail.module';

@Module({
  controllers: [SendEmailController],
  providers: [SendEmailService],
  imports: [
    MailModule
  ]
})
export class SendEmailModule { }
