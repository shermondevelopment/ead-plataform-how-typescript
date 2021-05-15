import { MissingParamError, InvalidParamError } from '../../erros'
import { badRequest, serverError, ok } from '../../helpers/http-helper'
import {
    Controller,
    HttpRequest,
    HttpResponse,
    AddAccount,
    EmailValidator
} from './signup-protocols'

export class SignUpController implements Controller {
    private readonly emailValidator: EmailValidator
    private readonly addAccount: AddAccount

    constructor(emailValidator: EmailValidator, addAccount: AddAccount) {
        this.emailValidator = emailValidator
        this.addAccount = addAccount
    }

    async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
        try {
            const requiredfields = ['name', 'email', 'sexo', 'password']
            for (const fields of requiredfields) {
                if (!httpRequest.body[fields]) {
                    return badRequest(new MissingParamError(fields))
                }
            }

            const { name, email, sexo, password } = httpRequest.body

            if (!this.emailValidator.isEmail(email)) {
                return badRequest(new InvalidParamError('email'))
            }

            const account = await this.addAccount.add({
                name,
                email,
                sexo,
                password
            })
            return ok(account)
        } catch (error) {
            return serverError(error)
        }
    }
}
