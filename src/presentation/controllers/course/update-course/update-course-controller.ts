import { UpdateCourse } from '../../../../domain/usecases/update-course/update-course'
import { Controller, HttpRequest, HttpResponse } from '../../../protocols'

export class UpdateCourseController implements Controller {
    constructor(private readonly updateCourse: UpdateCourse) {}

    async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
        this.updateCourse.update(httpRequest.body)
        return null
    }
}
