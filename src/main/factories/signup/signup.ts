import { DbAddAccount } from '../../../data/usecases/add-account/db-add-account'
import { BcryptAdapter } from '../../../infra/criptograph/bcrypt-adapter/bcrypt-adapter'
import { AccountMongoRepository } from '../../../infra/db/mysql/account/account-mysql-repository'
import { LogMysqlRepository } from '../../../infra/db/mysql/log/log-mysql-repository'
import { SignUpController } from '../../../presentation/controllers/signup/signup-controller'
import { Controller } from '../../../presentation/protocols'
import { LogControllerDecorator } from '../../decorators/log-controller-decorator'
import { makeSignUpValidation } from './signup-validators'

export const makeSignUpController = (): Controller => {
    const salt = 12
    const accountMysqlRepository = new AccountMongoRepository()
    const bcryptAdapter = new BcryptAdapter(salt)
    const dbAddAccount = new DbAddAccount(bcryptAdapter, accountMysqlRepository)
    const signupController = new SignUpController(
        dbAddAccount,
        makeSignUpValidation()
    )
    const logMysqlRepository = new LogMysqlRepository()
    return new LogControllerDecorator(signupController, logMysqlRepository)
}
