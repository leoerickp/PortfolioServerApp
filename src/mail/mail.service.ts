import { MailerService } from '@nestjs-modules/mailer';
import { Injectable, ServiceUnavailableException } from '@nestjs/common';
import { MessageDto } from 'src/send-email/dto/message.dto';
//import { User } from './../user/user.entity';

@Injectable()
export class MailService {
    constructor(private mailerService: MailerService) { }

    async sendEmailPortfolio(messageDto: MessageDto) {
        const { email, message, name, subject } = messageDto;
        const user = process.env.EMAIL;
        const text = message + '\n' + email;
        try {
            await this.mailerService.sendMail({
                to: process.env.EMAILTO,
                subject,
                from: user,
                text
            });
            return { statusCode: 200, msg: 'success' }

        } catch (error) {
            console.log(error)
            throw new ServiceUnavailableException('Service is unavailable');

        }

    }

    /*async sendUserConfirmation(user: User, token: string) {
        const url = `example.com/auth/confirm?token=${token}`;

        await this.mailerService.sendMail({
            to: user.email,
            // from: '"Support Team" <support@example.com>', // override default from
            subject: 'Welcome to Nice App! Confirm your Email',
            template: './confirmation', // `.hbs` extension is appended automatically
            context: { // ✏️ filling curly brackets with content
                name: user.name,
                url,
            },
        });
    }*/
}
