import { MissingParamError } from '../erros/missing-param-error'
import { badRequest } from '../helpers/http-helper'
import { Controller } from '../protocols/controller'
import { HttpRequest, HttpResponse } from '../protocols/http'

export class SignUpController implements Controller {
    handle(httpRequest: HttpRequest): HttpResponse {
        const requiredfields = ['name', 'email', 'sexo', 'password']
        for (const fields of requiredfields) {
            if (!httpRequest.body[fields]) {
                return badRequest(new MissingParamError(fields))
            }
        }
        return badRequest(new MissingParamError('sexo'))
    }
}
