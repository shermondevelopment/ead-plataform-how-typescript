import { Controller, HttpRequest, HttpResponse } from '../../../protocols'
import { Delete } from '../../course/delete-course/course-controller-protocols'
import {
    ok,
    serverError
} from '../add-discipline/add-discipline-controller-protocols'

export class DeleteDisciplineController implements Controller {
    constructor(private readonly destroy: Delete) {}

    async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
        try {
            const { id } = httpRequest.params
            await this.destroy.delete(id)
            return ok({ deleted: true })
        } catch (error) {
            return serverError(error)
        }
    }
}
