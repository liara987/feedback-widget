import nodemailer from 'nodemailer'
import { MailAdapter, SendMailData } from "../mail-adapter";

const transport = nodemailer.createTransport({
    host: "smtp.mailtrap.io",
    port: 2525,
    auth: {
        user: "7e535cd142112e",
        pass: "10592b99008cd5"
    }
});
export class NodemailerMailAdapter implements MailAdapter {

    async sendMail({ subject, body }: SendMailData) {
        await transport.sendMail({
            from: 'Feedback Team <liara@email.com>',
            to: 'Liara Duarte <liara@gmail.com>',
            subject,
            html: body
        })
    }
}