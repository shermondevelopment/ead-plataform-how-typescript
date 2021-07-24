import {
    Controller,
    HttpRequest,
    HttpResponse,
    UpdateClasse
} from './update-classes-controller-protocols'
import { ok, serverError } from '../add-classes/add-classe-controller-protocols'

export class UpdateClasseController implements Controller {
    constructor(private readonly updateClasse: UpdateClasse) {}

    async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
        try {
            const classId = httpRequest.params.classId
            await this.updateClasse.update(classId, httpRequest.body)
            return ok(null)
        } catch (error) {
            return serverError(error)
        }
    }
}
