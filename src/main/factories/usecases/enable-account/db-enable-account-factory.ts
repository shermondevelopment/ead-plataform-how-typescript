import { DbAccountEnable } from '../../../../data/usecases/account/account-enable/db-account-enable'
import { EnableAccount } from '../../../../domain/usecases/account/active-account/active-account'
import { AccountMongoRepository } from '../../../../infra/db/mysql/account/account-mysql-repository'

export const makeAccountEnable = (): EnableAccount => {
    const accountMysqlRepository = new AccountMongoRepository()
    return new DbAccountEnable(accountMysqlRepository)
}
