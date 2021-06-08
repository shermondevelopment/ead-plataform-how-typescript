import { UpdateCourse } from '../../../../domain/usecases/update-course/update-course'
import { serverError } from '../../../helpers/http/http-helper'
import { Controller, HttpRequest, HttpResponse } from '../../../protocols'

export class UpdateCourseController implements Controller {
    constructor(private readonly updateCourse: UpdateCourse) {}

    async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
        try {
            await this.updateCourse.update(httpRequest.body)
            return null
        } catch (error) {
            return serverError(error)
        }
    }
}
