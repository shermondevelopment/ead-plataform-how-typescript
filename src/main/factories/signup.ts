import { DbAddAccount } from '../../data/usecases/add-account/db-add-account'
import { BcryptAdapter } from '../../infra/criptograph/bcrypt-adapter'
import { AccountMongoRepository } from '../../infra/db/mysql/account-repository/account'
import { SignUpController } from '../../presentation/controllers/signup'
import { EmailValidatorAdapter } from '../../utils/email-validator-adapter'

export const makeSignUpController = (): SignUpController => {
    const salt = 12
    const accountMysqlRepository = new AccountMongoRepository()
    const emailValidatorAdapter = new EmailValidatorAdapter()
    const bcryptAdapter = new BcryptAdapter(salt)
    const dbAddAccount = new DbAddAccount(bcryptAdapter, accountMysqlRepository)
    return new SignUpController(emailValidatorAdapter, dbAddAccount)
}
