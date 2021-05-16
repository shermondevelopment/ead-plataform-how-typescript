import { Controller, HttpRequest, HttpResponse } from '../../protocols'
import { badRequest } from '../../helpers/http-helper'
import { MissingParamError } from '../../erros'

export class LoginController implements Controller {
    async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
        if (!httpRequest.body.email) {
            return new Promise((resolve) =>
                resolve(badRequest(new MissingParamError('email')))
            )
        }
        return new Promise((resolve) =>
            resolve(badRequest(new MissingParamError('password')))
        )
    }
}
