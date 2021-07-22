import { Controller, HttpRequest, HttpResponse } from '../../../protocols'
import {
    badRequest,
    ok,
    serverError,
    Validation,
    AddModules
} from './add-modules-controller-protocols'

export class AddModulesController implements Controller {
    constructor(
        private readonly validation: Validation,
        private readonly addModules: AddModules
    ) {}

    async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
        try {
            const error = this.validation.validate(httpRequest.body)
            if (error) {
                return badRequest(error)
            }
            const {
                title,
                order,
                disciplineId,
                qt_materials
            } = httpRequest.body
            const module = await this.addModules.add({
                title,
                order,
                qt_materials,
                disciplineId
            })
            return ok(module)
        } catch (error) {
            return serverError(error)
        }
    }
}
