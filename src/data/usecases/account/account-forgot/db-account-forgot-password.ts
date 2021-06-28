import {
    ForgotPassword,
    ForgotPasswordRequest
} from '../../../../domain/usecases/account/forgot-password/forgot-password'
import { ForgotPasswordRepository } from '../../../protocols/db/account/forgot-password-repository'

export class DbForgotPassword implements ForgotPassword {
    constructor(
        private readonly forgotPasswordRepository: ForgotPasswordRepository
    ) {}

    async request(data: ForgotPasswordRequest): Promise<boolean> {
        const { tokenResetExpired, tokenResetPassword, email } = data
        const forgotPassword = await this.forgotPasswordRepository.request({
            email,
            tokenResetPassword,
            tokenResetExpired
        })
        return forgotPassword
    }
}
