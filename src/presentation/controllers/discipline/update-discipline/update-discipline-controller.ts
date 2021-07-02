import { ok, serverError } from '../../../helpers/http/http-helper'
import {
    Controller,
    HttpRequest,
    HttpResponse,
    UpdateDiscipline
} from './update-discipline-controller-protocols'
export class UpdateDisciplineController implements Controller {
    constructor(private readonly updateCourse: UpdateDiscipline) {}

    async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
        try {
            await this.updateCourse.update(httpRequest.params, httpRequest.body)
            return ok({ success: 'updated successfully' })
        } catch (error) {
            return serverError(error)
        }
    }
}
