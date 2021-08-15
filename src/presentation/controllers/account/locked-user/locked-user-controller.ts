import { LockedUser } from '../../../../domain/usecases/account/locked-user/locked-user'
import {
    ok,
    serverError
} from '../account-enable/account-active-controller-protocols'
import {
    Controller,
    HttpRequest,
    HttpResponse
} from '../signup/signup-controller-protocols'

export class LockedUserController implements Controller {
    constructor(private readonly lockedUser: LockedUser) {}

    async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
        try {
            const token = await this.lockedUser.locked(httpRequest.accountId)
            return ok(token)
        } catch (error) {
            return serverError(error)
        }
    }
}
