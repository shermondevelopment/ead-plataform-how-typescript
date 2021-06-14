import { EmailInUseError } from '../../erros'
import {
    badRequest,
    serverError,
    ok,
    forbidden
} from '../../helpers/http/http-helper'
import {
    Controller,
    HttpRequest,
    HttpResponse,
    AddAccount,
    Validation,
    Authentication,
    SendEmail,
    HashRandomGenerate
} from './signup-controller-protocols'

export class SignUpController implements Controller {
    constructor(
        private readonly addAccount: AddAccount,
        private readonly validation: Validation,
        private readonly authentication: Authentication,
        private readonly sendEmail: SendEmail,
        private readonly hashRandomGenerate: HashRandomGenerate
    ) {}

    async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
        try {
            const error = this.validation.validate(httpRequest.body)
            if (error) {
                return badRequest(error)
            }

            const { name, email, sexo, password } = httpRequest.body
            const accountToken = this.hashRandomGenerate.generateHash()
            const account = await this.addAccount.add({
                name,
                email,
                sexo,
                password,
                token_account: accountToken
            })
            if (!account) {
                return forbidden(new EmailInUseError())
            }
            const token = await this.authentication.auth({ email, password })
            this.sendEmail.sendEmail({
                to: email,
                subject: 'Confirmação de e-mail',
                template: 'confirm_email',
                context: { token: accountToken }
            })
            return ok({ ...account, token })
        } catch (error) {
            return serverError(error)
        }
    }
}
