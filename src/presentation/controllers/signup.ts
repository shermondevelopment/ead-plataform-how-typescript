import { MissingParamError } from '../erros/missing-param-error'
import { badRequest } from '../helpers/http-helper'
import { Controller } from '../protocols/controller'
import { EmailValidator } from '../helpers/email-validator'
import { HttpRequest, HttpResponse } from '../protocols/http'
import { InvalidParamError } from '../erros/invalid-param-error'

export class SignUpController implements Controller {
    private readonly emailValidator: EmailValidator

    constructor(emailValidator: EmailValidator) {
        this.emailValidator = emailValidator
    }

    handle(httpRequest: HttpRequest): HttpResponse {
        const requiredfields = ['name', 'email', 'sexo', 'password']
        for (const fields of requiredfields) {
            if (!httpRequest.body[fields]) {
                return badRequest(new MissingParamError(fields))
            }
        }

        if (!this.emailValidator.isEmail(httpRequest.body.email)) {
            return badRequest(new InvalidParamError('email'))
        }

        return badRequest(new MissingParamError('sexo'))
    }
}
