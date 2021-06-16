import {
    EnableAccount,
    InvalidParamError,
    badRequest,
    ok,
    serverError
} from './account-active-controller-protocols'
import { Controller, HttpRequest, HttpResponse } from '../../protocols'

export class ActiveAccountController implements Controller {
    constructor(private readonly accountActive: EnableAccount) {}

    async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
        try {
            const { token } = httpRequest.query
            const active = await this.accountActive.enabled({ token })
            if (!active) {
                return badRequest(new InvalidParamError('token'))
            }
            return ok(active)
        } catch (error) {
            return serverError(error)
        }
    }
}
