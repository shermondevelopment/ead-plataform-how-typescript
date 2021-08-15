import { Controller } from '../../../../presentation/protocols'
import { makeLogControllerDecorator } from '../../decorators/log-controller-decorator-factory'
import { makeUnlockedUserValidation } from './unlocked-user-validation'
import { AccountMongoRepository } from '../../../../infra/db/mysql/account/account-mysql-repository'
import { UnlockedUserController } from '../../../../presentation/controllers/unlocked-user/unlocked-user-controller'
import { DbUnlockedUser } from '../../../../data/usecases/account/unlocked-user/db-unlocked-user'

export const makeUnlockedUserController = (): Controller => {
    const accountMysqlRepository = new AccountMongoRepository()
    const controller = new UnlockedUserController(
        makeUnlockedUserValidation(),
        new DbUnlockedUser(accountMysqlRepository)
    )
    return makeLogControllerDecorator(controller)
}
