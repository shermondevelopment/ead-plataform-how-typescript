import { Controller, HttpRequest, HttpResponse } from '../../../protocols'
import { Validation } from '../../../protocols/validation'

export class AddDisciplineController implements Controller {
    constructor(private readonly validations: Validation) {}

    async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
        this.validations.validate(httpRequest.body)
        return null
    }
}
