import { Injectable, NotFoundException } from '@nestjs/common';
import * as nodemailer from 'nodemailer';
import { MessageDto } from './dto/message.dto';

@Injectable()
export class SendEmailService {

    async sendEmail(messageDto: MessageDto) {
        let req: any;
        const { email, message, name, subject } = messageDto;
        const user = process.env.EMAIL;
        const pass = process.env.EPASSWORD;
        const to = process.env.EMAILTO;
        const text = message + '\n' + email;
        let transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user,
                pass
            }
        });
        let mailOptions = {
            from: user,
            to,
            subject,
            text
        };

        try {
            req = transporter.sendMail(mailOptions, (error, info) => {
                if (error) {
                    throw new NotFoundException(error);
                } else {
                    req = info;
                }
            });
            return { statusCode: 200, msg: 'success' }
        } catch (error) {
            throw new NotFoundException(error);
        }
    }
}
