import { Controller, HttpRequest, HttpResponse } from '../../../protocols'
import {
    badRequest,
    ok,
    serverError,
    Validation,
    AddClasse
} from './add-classe-controller-protocols'

export class AddClassesController implements Controller {
    constructor(
        private readonly validations: Validation,
        private readonly addClasse: AddClasse
    ) {}

    async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
        try {
            const error = this.validations.validate(httpRequest.body)
            if (error) {
                return badRequest(error)
            }
            const { title, url, order, moduleId } = httpRequest.body
            const classes = await this.addClasse.add({
                title,
                url,
                order,
                moduleId
            })
            return ok(classes)
        } catch (error) {
            return serverError(error)
        }
    }
}
