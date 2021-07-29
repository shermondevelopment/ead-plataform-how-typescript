import { AddHistoric } from '../../../domain/usecases/historic/add-historic'
import { Controller, HttpRequest, HttpResponse } from '../../protocols'
import {
    ok,
    serverError
} from '../account/account-enable/account-active-controller-protocols'

export class AddHistoricController implements Controller {
    constructor(private readonly addHistoric: AddHistoric) {}

    async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
        try {
            const user_id = httpRequest.accountId

            const historic = await this.addHistoric.add({
                user_id,
                ...httpRequest.body
            })
            return ok(historic)
        } catch (error) {
            return serverError(error)
        }
    }
}
