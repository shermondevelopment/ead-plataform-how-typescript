import { LoadModule } from '../../../../domain/usecases/module/load-module'
import { Controller, HttpRequest, HttpResponse } from '../../../protocols'
import {
    ok,
    serverError
} from '../add-modules/add-modules-controller-protocols'

export class LoadModuleController implements Controller {
    constructor(private readonly loadModules: LoadModule) {}

    async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
        try {
            const id = httpRequest.accountId
            const module = await this.loadModules.load(
                httpRequest.query.disciplineId,
                id
            )
            return ok(module)
        } catch (error) {
            return serverError(error)
        }
    }
}
