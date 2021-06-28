import { UpdateAccountPassword } from '../../../../domain/usecases/account/update-password/update-password'
import { Controller, HttpRequest, HttpResponse } from '../../../protocols'
import {
    badRequest,
    InvalidPassword,
    ok,
    serverError
} from '../account-enable/account-active-controller-protocols'
import { Validation } from '../signup/signup-controller-protocols'

export class UpdateAccountPasswordController implements Controller {
    constructor(
        private readonly validations: Validation,
        private readonly accountUpdatePassword: UpdateAccountPassword
    ) {}

    async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
        try {
            const error = this.validations.validate(httpRequest.body)

            if (error) {
                return badRequest(error)
            }
            const {
                password,
                confirmPassword,
                currentPassword
            } = httpRequest.body
            const id = httpRequest.accountId

            const updated = await this.accountUpdatePassword.updatePassword({
                id,
                password,
                confirmPassword,
                currentPassword
            })
            if (!updated) {
                return badRequest(new InvalidPassword())
            }
            return ok({ success: 'suas informações foram salvas' })
        } catch (error) {
            return serverError(error)
        }
    }
}
