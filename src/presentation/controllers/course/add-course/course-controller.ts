import { AddCourse } from '../../../../domain/usecases/add-course/add-course'
import { badRequest, ok, serverError } from '../../../helpers/http/http-helper'
import { Controller, HttpRequest, HttpResponse } from '../../../protocols'
import { Validation } from '../../signup/signup-controller-protocols'

export class AddCourseController implements Controller {
    constructor(
        private readonly validations: Validation,
        private readonly addCourse: AddCourse
    ) {}
    async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
        try {
            const error = this.validations.validate(httpRequest.body)
            if (error) {
                return badRequest(error)
            }
            const { title, figure } = httpRequest.body
            const course = await this.addCourse.add({
                title,
                figure
            })
            return ok(course)
        } catch (err) {
            return serverError(err)
        }
    }
}
