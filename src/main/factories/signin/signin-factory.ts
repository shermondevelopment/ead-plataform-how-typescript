import { Controller } from '../../../presentation/protocols'
import { makeSigninValidation } from './signin-validators-factory'
import { LoginController } from '../../../presentation/controllers/signin/login-controller'
import { LogControllerDecorator } from '../../decorators/log-controller-decorator'
import { LogMysqlRepository } from '../../../infra/db/mysql/log/log-mysql-repository'
import { DbAuthentication } from '../../../data/usecases/authentication/db-authentication'
import { AccountMongoRepository } from '../../../infra/db/mysql/account/account-mysql-repository'
import { BcryptAdapter } from '../../../infra/criptograph/bcrypt-adapter/bcrypt-adapter'
import { JwtAdapter } from '../../../infra/criptograph/jwt-adapter/jwt-adapter'

export const makeSigninController = (): Controller => {
    const salt = 12
    const bcryptAdapter = new BcryptAdapter(salt)
    const jwtAdapter = new JwtAdapter(process.env.JWT_KEY)
    const accountMysqlRepository = new AccountMongoRepository()
    const dbAuthentication = new DbAuthentication(
        accountMysqlRepository,
        bcryptAdapter,
        jwtAdapter,
        accountMysqlRepository
    )
    const loginController = new LoginController(
        makeSigninValidation(),
        dbAuthentication
    )
    const logMysqlRepository = new LogMysqlRepository()
    return new LogControllerDecorator(loginController, logMysqlRepository)
}
