import { Controller } from '../../../../presentation/protocols'
import { makeForgotPasswordValidation } from './forgot-password-validation-factory'
import { makeLogControllerDecorator } from '../../decorators/log-controller-decorator-factory'
import mailer from '../../../lib/mail-settings'
import { EmailSendAdapter } from '../../../../presentation/utils/email-send-adapter'
import { HashGenerateAdapter } from '../../../../presentation/utils/hash-generate-adapter'
import { DbForgotPassword } from '../../../../data/usecases/account/account-forgot/db-account-forgot-password'
import { AccountMongoRepository } from '../../../../infra/db/mysql/account/account-mysql-repository'
import { ForgotPasswordController } from '../../../../presentation/controllers/account/forgot-password/forgot-password-controller'

export const makeForgotPassword = (): Controller => {
    const data = new Date()
    const newData = data.setHours(data.getHours() + 48)
    const controller = new ForgotPasswordController(
        makeForgotPasswordValidation(),
        new DbForgotPassword(new AccountMongoRepository()),
        new HashGenerateAdapter(),
        newData,
        new EmailSendAdapter(mailer)
    )
    return makeLogControllerDecorator(controller)
}
