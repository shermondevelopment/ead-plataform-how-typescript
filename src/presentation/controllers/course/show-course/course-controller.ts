import { LoadCourses } from '../../../../domain/usecases/load-courses/load-course'
import { HttpRequest, HttpResponse, Controller } from '../../../protocols'

export class LoadCourseController implements Controller {
    constructor(private readonly courses: LoadCourses) {}

    async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
        const { search, page } = httpRequest.query
        this.courses.load({ search, page })
        return null
    }
}
