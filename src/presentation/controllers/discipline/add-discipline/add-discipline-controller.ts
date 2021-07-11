import { Controller, HttpRequest, HttpResponse } from '../../../protocols'
import {
    badRequest,
    ok,
    serverError,
    AddDiscipline,
    Validation
} from './add-discipline-controller-protocols'

export class AddDisciplineController implements Controller {
    constructor(
        private readonly validations: Validation,
        private readonly addDiscipline: AddDiscipline
    ) {}

    async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
        try {
            const error = this.validations.validate(httpRequest.body)
            if (error) {
                return badRequest(error)
            }
            const { title, courseId, qt_modules } = httpRequest.body
            const discipline = await this.addDiscipline.add({
                title,
                qt_modules,
                courseId
            })
            return ok(discipline)
        } catch (error) {
            return serverError(error)
        }
    }
}
