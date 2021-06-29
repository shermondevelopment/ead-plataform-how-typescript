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
            const discipline = await this.addDiscipline.add({
                title: httpRequest.body.title
            })
            return ok(discipline)
        } catch (error) {
            return serverError(error)
        }
    }
}
