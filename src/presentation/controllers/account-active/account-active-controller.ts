import { ActiveAccount } from '../../../domain/usecases/active-account/active-account'
import { Controller, HttpRequest, HttpResponse } from '../../protocols'

export class ActiveAccountController implements Controller {
    constructor(private readonly accountActive: ActiveAccount) {}

    async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
        const { token } = httpRequest.query
        await this.accountActive.accountActive({ token })
        return null
    }
}
