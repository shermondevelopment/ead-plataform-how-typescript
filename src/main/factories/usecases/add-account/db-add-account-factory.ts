import { DbAddAccount } from '../../../../data/usecases/add-account/db-add-account'
import { AccountMongoRepository } from '../../../../infra/db/mysql/account/account-mysql-repository'
import { BcryptAdapter } from '../../../../infra/criptograph/bcrypt-adapter/bcrypt-adapter'
import { AddAccount } from '../../../../domain/usecases/add-account/add-account'

export const makeDbAddAccount = (): AddAccount => {
    const salt = 12
    const accountMysqlRepository = new AccountMongoRepository()
    const bcryptAdapter = new BcryptAdapter(salt)
    return new DbAddAccount(bcryptAdapter, accountMysqlRepository)
}
