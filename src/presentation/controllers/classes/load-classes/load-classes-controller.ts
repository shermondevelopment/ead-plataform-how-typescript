import { LoadClass } from './load-classes-controller-protocols'
import {
    Controller,
    HttpRequest,
    HttpResponse,
    ok,
    serverError
} from '../update-classes/update-classes-controller-protocols'

export class LoadClassController implements Controller {
    constructor(private readonly loadClass: LoadClass) {}

    async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
        try {
            const userId = httpRequest.accountId
            const { id: moduleId } = httpRequest.params
            const classes = await this.loadClass.load(userId, moduleId)
            return ok(classes)
        } catch (error) {
            return serverError(error)
        }
    }
}
