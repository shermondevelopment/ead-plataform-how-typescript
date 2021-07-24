import {
    Delete,
    HttpRequest,
    HttpResponse
} from '../../course/delete-course/course-controller-protocols'
import {
    Controller,
    ok,
    serverError
} from '../update-classes/update-classes-controller-protocols'

export class DeleteClasseController implements Controller {
    constructor(private readonly deleteClasse: Delete) {}

    async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
        try {
            const { id } = httpRequest.params
            const deleted = await this.deleteClasse.delete(id)
            if (deleted) {
                return ok({ deleted: true })
            }
        } catch (error) {
            return serverError(error)
        }
    }
}
