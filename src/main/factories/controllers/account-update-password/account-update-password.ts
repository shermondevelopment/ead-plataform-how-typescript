import { Controller } from '../../../../presentation/protocols'
import { makeLogControllerDecorator } from '../../decorators/log-controller-decorator-factory'
import { UpdateAccountPasswordController } from '../../../../presentation/controllers/account/account-update-password/account-update-password'
import { DbUpdatePassword } from '../../../../data/usecases/account/account-update-password/db-update-password'
import { BcryptAdapter } from '../../../../infra/criptograph/bcrypt-adapter/bcrypt-adapter'
import { makeUpdatePasswodValidation } from './account-update-password-validation'
import { AccountMongoRepository } from '../../../../infra/db/mysql/account/account-mysql-repository'

export const makeUpdatePasswordController = (): Controller => {
    const salt = 12
    const controller = new UpdateAccountPasswordController(
        makeUpdatePasswodValidation(),
        new DbUpdatePassword(
            new AccountMongoRepository(),
            new AccountMongoRepository(),
            new BcryptAdapter(salt),
            new BcryptAdapter(salt)
        )
    )
    return makeLogControllerDecorator(controller)
}
