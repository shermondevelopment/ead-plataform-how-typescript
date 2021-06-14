import { SendEmail, EmailSendParams } from '../protocols'

export class EmailSendAdapter implements SendEmail {
    constructor(private readonly email: any) {}

    async sendEmail(paramsEmail: EmailSendParams): Promise<void> {
        await this.email.sendMail({
            from: process.env.MAIL_USER,
            to: paramsEmail.to,
            subject: paramsEmail.subject,
            template: paramsEmail.template,
            context: paramsEmail.context
        })
    }
}
