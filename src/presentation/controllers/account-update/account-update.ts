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
    constructor(private readonly updateAccount: UpdateAccount) {}

    async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
        try {
            const id = httpRequest.accountId
            const account: UpdateAccountModel = httpRequest.body
            await this.updateAccount.update(id, { ...account })
            return ok({ success: 'updated successfully' })
        } catch (error) {
            return serverError(error)
        }
    }
}
