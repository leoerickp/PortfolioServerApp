import { MailerModule } from '@nestjs-modules/mailer';
import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter';
import { Module } from '@nestjs/common';
import { MailService } from './mail.service';
import { join } from 'path';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule,
    MailerModule.forRoot({
      // transport: 'smtps://user@example.com:topsecret@smtp.example.com',
      // or
      transport: {
        //host: 'smtp.example.com',
        service: 'gmail',
        secure: true,
        auth: {
          user: process.env.EMAIL,
          pass: process.env.EPASSWORD,
        },
      },
      defaults: {
        from: '"No Reply" <noreply@example.com>',
      }
    }),
  ],
  providers: [MailService],
  exports: [MailService], // 👈 export for DI
})
export class MailModule {
  constructor() {
    console.log(process.env.EMAIL, process.env.EPASSWORD)
  }
}
