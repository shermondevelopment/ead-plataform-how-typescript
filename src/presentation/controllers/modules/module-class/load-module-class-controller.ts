import { LoadClassFromModule } from '../../../../domain/usecases/module/load-class-from-module'
import {
    Controller,
    HttpRequest,
    HttpResponse,
    ok,
    serverError
} from '../delete-modules/delete-module-protocols'

export class LoadClassFromModuleController implements Controller {
    constructor(private readonly loadClassFromModule: LoadClassFromModule) {}

    async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
        try {
            const userId = httpRequest.accountId
            const { id: moduleId } = httpRequest.params
            const classe = await this.loadClassFromModule.loadClass(
                userId,
                moduleId
            )
            return ok(classe)
        } catch (error) {
            return serverError(error)
        }
    }
}
