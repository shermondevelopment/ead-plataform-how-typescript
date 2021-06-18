import { Controller } from '../../../../presentation/protocols'
import { makeLogControllerDecorator } from '../../decorators/log-controller-decorator-factory'
import { ActiveAccountController } from '../../../../presentation/controllers/account-enable/account-active-controller'
import { makeAccountEnable } from '../../usecases/enable-account/db-enable-account-factory'

export const makeEnableAccountController = (): Controller => {
    return makeLogControllerDecorator(
        new ActiveAccountController(makeAccountEnable())
    )
}
