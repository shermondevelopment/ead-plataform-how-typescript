import { ActiveAccount } from '../../../domain/usecases/active-account/active-account'
import { InvalidParamError } from '../../erros'
import { badRequest, serverError } from '../../helpers/http/http-helper'
import { Controller, HttpRequest, HttpResponse } from '../../protocols'

export class ActiveAccountController implements Controller {
    constructor(private readonly accountActive: ActiveAccount) {}

    async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
        try {
            const { token } = httpRequest.query
            const active = await this.accountActive.accountActive({ token })
            if (!active) {
                return badRequest(new InvalidParamError('token'))
            }
            return null
        } catch (error) {
            return serverError(error)
        }
    }
}
