import { LoadProgress } from './load-progress-controller-protocols'
import {
    Controller,
    HttpRequest,
    HttpResponse,
    ok,
    serverError
} from '../delete-modules/delete-module-protocols'

export class LoadProgressController implements Controller {
    constructor(private readonly loadProgress: LoadProgress) {}

    async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
        try {
            const user_id = httpRequest.accountId
            const { disciplineId } = httpRequest.query
            const progress = await this.loadProgress.load({
                user_id,
                disciplineId
            })
            return ok(progress)
        } catch (error) {
            return serverError(error)
        }
    }
}
