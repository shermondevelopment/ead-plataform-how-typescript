import { DbAccountEnable } from '../../../../data/usecases/account-enable/db-account-enable'
import { EnableAccount } from '../../../../domain/usecases/active-account/active-account'
import { AccountMongoRepository } from '../../../../infra/db/mysql/account/account-mysql-repository'

export const makeAccountEnable = (): EnableAccount => {
    const accountMysqlRepository = new AccountMongoRepository()
    return new DbAccountEnable(accountMysqlRepository)
}
