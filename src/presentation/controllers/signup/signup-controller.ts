import { badRequest, serverError, ok } from '../../helpers/http/http-helper'
import {
    Controller,
    HttpRequest,
    HttpResponse,
    AddAccount,
    Validation,
    Authentication
} from './signup-controller-protocols'

export class SignUpController implements Controller {
    constructor(
        private readonly addAccount: AddAccount,
        private readonly validation: Validation,
        private readonly authentication: Authentication
    ) {}

    async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
        try {
            const error = this.validation.validate(httpRequest.body)
            if (error) {
                return badRequest(error)
            }
            const { name, email, sexo, password } = httpRequest.body

            const account = await this.addAccount.add({
                name,
                email,
                sexo,
                password
            })
            const token = await this.authentication.auth({ email, password })
            return ok({ ...account, token })
            return ok(account)
        } catch (error) {
            return serverError(error)
        }
    }
}
