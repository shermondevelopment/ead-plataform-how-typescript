import { UpdateCourse } from './update-course-controller-protocols'
import { ok, serverError } from '../../../helpers/http/http-helper'
import { Controller, HttpRequest, HttpResponse } from '../../../protocols'

export class UpdateCourseController implements Controller {
    constructor(private readonly updateCourse: UpdateCourse) {}

    async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
        try {
            const updateCourse = await this.updateCourse.update(
                httpRequest.body
            )
            return ok(updateCourse)
        } catch (error) {
            return serverError(error)
        }
    }
}
