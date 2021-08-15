import { Controller } from '../../../../presentation/protocols'
import { makeLogControllerDecorator } from '../../decorators/log-controller-decorator-factory'
import { AccountMongoRepository } from '../../../../infra/db/mysql/account/account-mysql-repository'
import { DbLockedUser } from '../../../../data/usecases/account/locked-user/db-locked-user'
import { LockedUserController } from '../../../../presentation/controllers/account/locked-user/locked-user-controller'

export const makeLockedUserController = (): Controller => {
    const accountMysqlRepository = new AccountMongoRepository()
    const controller = new LockedUserController(
        new DbLockedUser(accountMysqlRepository)
    )
    return makeLogControllerDecorator(controller)
}
