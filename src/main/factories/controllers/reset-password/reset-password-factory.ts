import { Controller } from '../../../../presentation/protocols'
import { makeLogControllerDecorator } from '../../decorators/log-controller-decorator-factory'
import { AccountMongoRepository } from '../../../../infra/db/mysql/account/account-mysql-repository'
import { ResetPasswordController } from '../../../../presentation/controllers/account/reset-password/reset-password-controller'
import { DbResetPassword } from '../../../../data/usecases/account/reset-password/db-reset-password'
import { BcryptAdapter } from '../../../../infra/criptograph/bcrypt-adapter/bcrypt-adapter'
import { makeResetPasswordValidation } from './reset-password-validation'

export const makeResetPassword = (): Controller => {
    const salt = 12
    const controller = new ResetPasswordController(
        makeResetPasswordValidation(),
        new DbResetPassword(
            new AccountMongoRepository(),
            new BcryptAdapter(salt)
        )
    )
    return makeLogControllerDecorator(controller)
}
