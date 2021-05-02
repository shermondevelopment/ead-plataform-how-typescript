import { MissingParamError } from '../erros/missing-param-error'
import { Controller } from '../protocols/controller'
import { HttpRequest, HttpResponse } from '../protocols/http'

export class SignUpController implements Controller {
    handle(httpRequest: HttpRequest): HttpResponse {
        const requiredfields = ['name', 'email', 'sexo']
        for (const fields of requiredfields) {
            if (!httpRequest.body[fields]) {
                return {
                    statusCode: 400,
                    body: new MissingParamError(fields)
                }
            }
        }
        return {
            statusCode: 400,
            body: new MissingParamError('sexo')
        }
    }
}
