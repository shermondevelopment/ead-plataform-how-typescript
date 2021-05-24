import { InvalidParamError } from '../../presentation/erros'
import { EmailValidator } from '../protocols/email-validator'
import { Validation } from '../../presentation/protocols/validation'

export class EmailValidation implements Validation {
    constructor(
        private readonly fieldName: string,
        private readonly emailValidator: EmailValidator
    ) {}
    validate(input: any): Error {
        const isValid = this.emailValidator.isEmail(input[this.fieldName])
        if (!isValid) {
            return new InvalidParamError(this.fieldName)
        }
    }
}
