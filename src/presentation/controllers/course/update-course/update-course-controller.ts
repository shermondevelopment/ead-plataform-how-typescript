import { UpdateCourse } from './update-course-controller-protocols'
import { ok, serverError } from '../../../helpers/http/http-helper'
import { Controller, HttpRequest, HttpResponse } from '../../../protocols'

export class UpdateCourseController implements Controller {
    constructor(private readonly updateCourse: UpdateCourse) {}

    async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
        try {
            await this.updateCourse.update(httpRequest.params, httpRequest.body)
            return ok({ success: 'updated successfully' })
        } catch (error) {
            return serverError(error)
        }
    }
}
