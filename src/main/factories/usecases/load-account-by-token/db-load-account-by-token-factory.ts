import { DbLoadAccountByToken } from '../../../../data/usecases/account/load-account-by-token/db-load-account-by-token'
import { JwtAdapter } from '../../../../infra/criptograph/jwt-adapter/jwt-adapter'
import { AccountMongoRepository } from '../../../../infra/db/mysql/account/account-mysql-repository'
import { LoadAccountByToken } from '../../../../presentation/middlewares/auth-middleware-protocols'

export const makeDbLoadAccountByToken = (): LoadAccountByToken => {
    const jwtAdapter = new JwtAdapter(process.env.JWT_KEY)
    const accountMysqlRepository = new AccountMongoRepository()
    return new DbLoadAccountByToken(jwtAdapter, accountMysqlRepository)
}
