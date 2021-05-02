import { Controller } from '../protocols/controller'
import { HttpRequest, HttpResponse } from '../protocols/http'

export class SignUpController implements Controller {
    handle(httpRequest: HttpRequest): HttpResponse {
        const requiredfields = ['name', 'email', 'sexo']
        for (const fields of requiredfields) {
            if (!httpRequest.body[fields]) {
                return {
                    statusCode: 400,
                    body: new Error(`missing param: ${fields}`)
                }
            }
        }
        return {
            statusCode: 400,
            body: new Error('missing param: sexo')
        }
    }
}
