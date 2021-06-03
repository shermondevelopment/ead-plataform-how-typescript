import { serverError, ok } from '../../../helpers/http/http-helper'
import {
    HttpRequest,
    HttpResponse,
    Controller,
    LoadCourses
} from './course-controller-protocols'

export class LoadCourseController implements Controller {
    constructor(private readonly courses: LoadCourses) {}

    async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
        try {
            const { search, page } = httpRequest.query
            const course = await this.courses.load({ search, page })
            return ok(course)
        } catch (error) {
            return serverError(error)
        }
    }
}
