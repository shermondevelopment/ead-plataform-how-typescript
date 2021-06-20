import { ForgotPassword } from '../../../domain/usecases/forgot-password/forgot-password'
import { Controller, HttpRequest, HttpResponse } from '../../protocols'
import {
    badRequest,
    EmailInUseError,
    MissingParamError,
    notDataExists,
    ok,
    serverError
} from '../account-enable/account-active-controller-protocols'
import { Validation } from '../signup/signup-controller-protocols'

export class ForgotPasswordController implements Controller {
    constructor(
        private readonly validations: Validation,
        private readonly forgotPassword: ForgotPassword
    ) {}

    async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
        try {
            const error = this.validations.validate(httpRequest.body)
            if (error) {
                return badRequest(error)
            }
            const resetPassword = await this.forgotPassword.email(
                httpRequest.body
            )
            if (!resetPassword) {
                return notDataExists('Usuário')
            }
            return ok({ success: 'Quase lá, dê uma checada em seu e-mail' })
        } catch (error) {
            return serverError(error)
        }
    }
}
