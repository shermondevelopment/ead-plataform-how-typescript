import {
    Controller,
    HttpRequest,
    HttpResponse,
    Delete,
    ok,
    serverError
} from './delete-module-protocols'

export class DeleteModuleController implements Controller {
    constructor(private readonly destroy: Delete) {}

    async handle(HttpRequest: HttpRequest): Promise<HttpResponse> {
        try {
            await this.destroy.delete(HttpRequest.params.id)
            return ok({ deleted: true })
        } catch (error) {
            return serverError(error)
        }
    }
}
