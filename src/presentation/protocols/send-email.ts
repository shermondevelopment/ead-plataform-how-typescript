export interface EmailSendParams {
    to: string
    subject: string
    template: string
    context: any
}

export interface SendEmail {
    sendEmail(paramsEmail: EmailSendParams): Promise<void>
}
