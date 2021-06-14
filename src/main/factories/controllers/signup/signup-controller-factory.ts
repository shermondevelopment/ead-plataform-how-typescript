import { SignUpController } from '../../../../presentation/controllers/signup/signup-controller'
import { Controller } from '../../../../presentation/protocols'
import { makeDbAuthentication } from '../../usecases/authentication/db-authentication-factory'
import { makeSignUpValidation } from './signup-validators'
import { makeDbAddAccount } from '../../usecases/add-account/db-add-account-factory'
import { makeLogControllerDecorator } from '../../decorators/log-controller-decorator-factory'
import mailer from '../../../lib/mail-settings'
import { EmailSendAdapter } from '../../../../presentation/utils/email-send-adapter'
import { HashGenerateAdapter } from '../../../../presentation/utils/hash-generate-adapter'

export const makeSignUpController = (): Controller => {
    const controller = new SignUpController(
        makeDbAddAccount(),
        makeSignUpValidation(),
        makeDbAuthentication(),
        new EmailSendAdapter(mailer),
        new HashGenerateAdapter()
    )
    return makeLogControllerDecorator(controller)
}
