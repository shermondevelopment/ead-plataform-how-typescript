import { Controller, HttpRequest, HttpResponse } from '../../../protocols'
import {
    badRequest,
    ok,
    serverError,
    Validation,
    AddProgress
} from './add-progress-controller-protocols'

export class AddProgressController implements Controller {
    constructor(
        private readonly validation: Validation,
        private readonly addProgress: AddProgress
    ) {}

    async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
        try {
            const error = this.validation.validate(httpRequest.body)
            if (error) {
                return badRequest(error)
            }
            const user_id = httpRequest.accountId
            const { totalItems, completedItems, moduleId } = httpRequest.body
            await this.addProgress.add({
                user_id,
                totalItems: parseInt(totalItems),
                completedItems: parseInt(completedItems),
                moduleId
            })
            return ok(null)
        } catch (error) {
            return serverError(error)
        }
    }
}
