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
            await this.updateClasse.update(
                httpRequest.body.classeId,
                httpRequest.body
            )
            return ok(null)
        } catch (error) {
            return serverError(error)
        }
    }
}
