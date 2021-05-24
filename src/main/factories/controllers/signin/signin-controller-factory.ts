import { Controller } from '../../../../presentation/protocols'
import { makeSigninValidation } from './signin-validators-factory'
import { LoginController } from '../../../../presentation/controllers/signin/login-controller'
import { makeDbAuthentication } from '../../usecases/authentication/db-authentication-factory'
import { makeLogControllerDecorator } from '../../decorators/log-controller-decorator-factory'

export const makeSigninController = (): Controller => {
    return makeLogControllerDecorator(
        new LoginController(makeSigninValidation(), makeDbAuthentication())
    )
}
