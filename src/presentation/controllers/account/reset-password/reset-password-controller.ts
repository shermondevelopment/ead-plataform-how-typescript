import { Controller, HttpRequest, HttpResponse } from '../../../protocols'
import { badRequest } from '../account-enable/account-active-controller-protocols'
import { Validation } from '../signup/signup-controller-protocols'
import {
    notDataExists,
    ok,
    serverError,
    ResetPassword
} from './reset-password-controller-protocols'

export class ResetPasswordController implements Controller {
    constructor(
        private readonly validation: Validation,
        private readonly resetPassword: ResetPassword
    ) {}

    async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
        try {
            const error = this.validation.validate(httpRequest.body)
            if (error) {
                return badRequest(error)
            }
            const { token, password } = httpRequest.body
            const reset = await this.resetPassword.reset({
                token,
                password
            })
            if (!reset) {
                return notDataExists('Token de redefinição de senha inválido.')
            }
            return ok({ success: 'Boa, agora é só fazer login' })
        } catch (error) {
            return serverError(error)
        }
    }
}
