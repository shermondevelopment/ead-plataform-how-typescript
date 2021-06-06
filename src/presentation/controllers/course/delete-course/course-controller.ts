import { badRequest, serverError, ok } from '../../../helpers/http/http-helper'
import {
    HttpRequest,
    HttpResponse,
    Controller,
    Validation,
    Delete
} from './course-controller-protocols'

export class DeleteCourseController implements Controller {
    constructor(
        private readonly validations: Validation,
        private readonly destroy: Delete
    ) {}

    async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
        try {
            const error = this.validations.validate(httpRequest.params)
            if (error) {
                return badRequest(error)
            }
            const { id } = httpRequest.params
            const courseDelete = await this.destroy.delete({ id })
            return ok(courseDelete)
        } catch (error) {
            return serverError(error)
        }
    }
}
