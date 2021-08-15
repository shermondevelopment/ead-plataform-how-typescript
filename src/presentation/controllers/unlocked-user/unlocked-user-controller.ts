import { UnlockedUser } from '../../../domain/usecases/account/unlocked-user/unlocked-user'
import { Controller, HttpRequest, HttpResponse } from '../../protocols'
import { Validation } from '../../protocols/validation'
import {
    badRequest,
    ok,
    serverError
} from '../account/account-enable/account-active-controller-protocols'

export class UnlockedUserController implements Controller {
    constructor(
        private readonly validations: Validation,
        private readonly unlockedUser: UnlockedUser
    ) {}

    async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
        try {
            const error = this.validations.validate(httpRequest.body)
            if (error) {
                return badRequest(error)
            }
            await this.unlockedUser.unlocked(httpRequest.body.email)
            return ok({ unlocked: true })
        } catch (error) {
            return serverError(error)
        }
    }
}
