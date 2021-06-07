import { serverError, ok } from '../../../helpers/http/http-helper'
import {
    HttpRequest,
    HttpResponse,
    Controller,
    Delete
} from './course-controller-protocols'

export class DeleteCourseController implements Controller {
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
