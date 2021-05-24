import { DbAuthentication } from '../../../../data/usecases/authentication/db-authentication'
import { AccountMongoRepository } from '../../../../infra/db/mysql/account/account-mysql-repository'
import { BcryptAdapter } from '../../../../infra/criptograph/bcrypt-adapter/bcrypt-adapter'
import { JwtAdapter } from '../../../../infra/criptograph/jwt-adapter/jwt-adapter'
import { Authentication } from '../../../../domain/usecases/authentication/authentication'

export const makeDbAuthentication = (): Authentication => {
    const salt = 12
    const bcryptAdapter = new BcryptAdapter(salt)
    const jwtAdapter = new JwtAdapter(process.env.JWT_KEY)
    const accountMysqlRepository = new AccountMongoRepository()
    return new DbAuthentication(
        accountMysqlRepository,
        bcryptAdapter,
        jwtAdapter,
        accountMysqlRepository
    )
}
