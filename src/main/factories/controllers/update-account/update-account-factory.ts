import { Controller } from '../../../../presentation/protocols'
import { makeLogControllerDecorator } from '../../decorators/log-controller-decorator-factory'
import { AccountMongoRepository } from '../../../../infra/db/mysql/account/account-mysql-repository'
import { UpdateAccountController } from '../../../../presentation/controllers/account/account-update/account-update'
import { DbAccountUpdate } from '../../../../data/usecases/account/account-update/db-update-account'
import { makeUpdateAccountValidation } from './update-account-validation'

export const makeUpdateAccountController = (): Controller => {
    const controller = new UpdateAccountController(
        new DbAccountUpdate(new AccountMongoRepository()),
        makeUpdateAccountValidation()
    )
    return makeLogControllerDecorator(controller)
}
