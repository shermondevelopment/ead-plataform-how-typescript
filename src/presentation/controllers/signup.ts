import { Controller } from '../protocols/controller'
import { HttpRequest, HttpResponse } from '../protocols/http'

export class SignUpController implements Controller {
    handle(httpRequest: HttpRequest): HttpResponse {
        if (!httpRequest.body.name) {
            return {
                statusCode: 400,
                body: new Error('missing param: name')
            }
        }
        if (!httpRequest.body.email) {
            return {
                statusCode: 400,
                body: new Error('missing param: email')
            }
        }
        return {
            statusCode: 400,
            body: new Error('missing param: email')
        }
    }
}
