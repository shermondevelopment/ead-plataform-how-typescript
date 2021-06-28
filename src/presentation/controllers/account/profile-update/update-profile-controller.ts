import { UpdateProfile } from '../../../../domain/usecases/account/update-profile/update-profile'
import { Controller, HttpRequest, HttpResponse } from '../../../protocols'
import {
    badRequest,
    MissingParamError,
    ok,
    serverError
} from '../account-enable/account-active-controller-protocols'

export class UpdateProfileController implements Controller {
    constructor(private readonly updateProfile: UpdateProfile) {}

    async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
        try {
            const { figure: profile } = httpRequest.body
            const id = httpRequest.accountId
            if (!id) {
                return badRequest(new MissingParamError('id'))
            }
            const updatedProfile = await this.updateProfile.setProfile({
                profile,
                id
            })
            return ok(updatedProfile)
        } catch (error) {
            return serverError(error)
        }
    }
}
