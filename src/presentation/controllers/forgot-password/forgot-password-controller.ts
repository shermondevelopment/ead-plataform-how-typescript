import {
    Controller,
    HttpRequest,
    HttpResponse,
    Validation,
    ForgotPassword
} from './forgot-password-controller-protocols'
import {
    badRequest,
    notDataExists,
    ok,
    serverError
} from '../account-enable/account-active-controller-protocols'
import { HashRandomGenerate, SendEmail } from '../../protocols'

export class ForgotPasswordController implements Controller {
    constructor(
        private readonly validations: Validation,
        private readonly forgotPassword: ForgotPassword,
        private readonly tokenResetToken: HashRandomGenerate,
        private readonly tokenResetExpired: number,
        private readonly sendEmail: SendEmail
    ) {}

    async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
        try {
            const error = this.validations.validate(httpRequest.body)
            if (error) {
                return badRequest(error)
            }
            const { email } = httpRequest.body
            const tokenResetPassword = this.tokenResetToken.generateHash()

            const resetPassword = await this.forgotPassword.request({
                email,
                tokenResetPassword,
                tokenResetExpired: this.tokenResetExpired
            })
            if (!resetPassword) {
                return notDataExists('Usuário não encontrado')
            }

            this.sendEmail.sendEmail({
                to: email,
                subject: 'Hora de recuperar sua senha',
                template: 'reset_password',
                context: { token: tokenResetPassword }
            })

            return ok({ success: 'Quase lá, dê uma checada em seu e-mail' })
        } catch (error) {
            return serverError(error)
        }
    }
}
