import { HttpRequest, HttpResponse, Controller } from '../../../protocols'
import {
    ok,
    serverError,
    UpdateModule
} from './update-module-controller-protocols'

export class UpdateModuleController implements Controller {
    constructor(private readonly updateModule: UpdateModule) {}

    async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
        try {
            await this.updateModule.update(
                httpRequest.params.id,
                httpRequest.body
            )
            return ok({ success: 'updated successfully' })
        } catch (error) {
            return serverError(error)
        }
    }
}
