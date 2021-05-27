import { badRequest } from '../../../helpers/http/http-helper'
import { Controller, HttpRequest, HttpResponse } from '../../../protocols'
import { Validation } from '../../signup/signup-controller-protocols'

export class AddCourseController implements Controller {
    constructor(private readonly validations: Validation) {}
    async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
        const error = this.validations.validate(httpRequest.body)
        if (error) {
            return badRequest(error)
        }
    }
}
