import { InvalidParamError } from '../../erros'
import { EmailValidator } from '../email-validator'
import { Validation } from './validation'

export class EmailValidation implements Validation {
    private readonly fieldName: string
    private readonly emailValidator: EmailValidator

    constructor(fieldName: string, emailValidator: EmailValidator) {
        this.fieldName = fieldName
        this.emailValidator = emailValidator
    }
    validate(input: any): Error {
        const isValid = this.emailValidator.isEmail(input[this.fieldName])
        if (!isValid) {
            return new InvalidParamError(this.fieldName)
        }
    }
}
