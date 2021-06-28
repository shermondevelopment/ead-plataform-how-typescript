import { badRequest } from '../account-enable/account-active-controller-protocols'
import { Validation } from '../signup/signup-controller-protocols'
import {
    UpdateAccount,
    UpdateAccountModel,
    ok,
    serverError,
    HttpRequest,
    HttpResponse,
    Controller
} from './account-update-protocols'

export class UpdateAccountController implements Controller {
    constructor(
        private readonly updateAccount: UpdateAccount,
        private readonly validation: Validation
    ) {}

    async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
        try {
            const id = httpRequest.accountId
            const account: UpdateAccountModel = httpRequest.body

            const error = this.validation.validate(httpRequest.body)

            if (error) {
                return badRequest(error)
            }

            const updated = await this.updateAccount.updateAccount(id, {
                ...account
            })

            return ok(updated)
        } catch (error) {
            return serverError(error)
        }
    }
}
