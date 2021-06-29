import { LoadDiscipline } from '../../../../domain/usecases/discipline/load/load-discipline'
import { Controller, HttpRequest, HttpResponse } from '../../../protocols'
import {
    ok,
    serverError
} from '../add-discipline/add-discipline-controller-protocols'

export class DbLoadDisciplineController implements Controller {
    constructor(private readonly loadDiscipline: LoadDiscipline) {}

    async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
        try {
            const discipline = await this.loadDiscipline.load()
            return ok(discipline)
        } catch (error) {
            return serverError(error)
        }
    }
}
