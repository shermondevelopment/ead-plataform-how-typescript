import { LoadCourses } from '../../../../domain/usecases/load-courses/load-course'
import { serverError } from '../../../helpers/http/http-helper'
import { HttpRequest, HttpResponse, Controller } from '../../../protocols'

export class LoadCourseController implements Controller {
    constructor(private readonly courses: LoadCourses) {}

    async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
        try {
            const { search, page } = httpRequest.query
            await this.courses.load({ search, page })
        } catch (error) {
            return serverError(error)
        }
    }
}
