import { DbAddAccount } from '../../data/usecases/add-account/db-add-account'
import { BcryptAdapter } from '../../infra/criptograph/bcrypt-adapter'
import { AccountMongoRepository } from '../../infra/db/mysql/account-repository/account'
import { SignUpController } from '../../presentation/controllers/signup/signup'
import { Controller } from '../../presentation/protocols'
import { EmailValidatorAdapter } from '../../utils/email-validator-adapter'
import { LogControllerDecorator } from '../decorators/log'

export const makeSignUpController = (): Controller => {
    const salt = 12
    const accountMysqlRepository = new AccountMongoRepository()
    const emailValidatorAdapter = new EmailValidatorAdapter()
    const bcryptAdapter = new BcryptAdapter(salt)
    const dbAddAccount = new DbAddAccount(bcryptAdapter, accountMysqlRepository)
    const signupController = new SignUpController(
        emailValidatorAdapter,
        dbAddAccount
    )
    return new LogControllerDecorator(signupController)
}
