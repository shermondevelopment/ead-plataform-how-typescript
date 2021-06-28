import {
    ResetPassword,
    ResetPasswordParams
} from '../../../../domain/usecases/account/reset-password/reset-password'
import { ResetPasswordRepository } from '../../../protocols/db/account/reset-password-repository'
import { Hash } from '../add-account/db-add-account-protocols'

export class DbResetPassword implements ResetPassword {
    constructor(
        private readonly resetPasswordRepository: ResetPasswordRepository,
        private readonly hash: Hash
    ) {}
    async reset(params: ResetPasswordParams): Promise<boolean> {
        const password = await this.hash.hash(params.password)
        return await this.resetPasswordRepository.reset({
            token: params.token,
            password
        })
    }
}
