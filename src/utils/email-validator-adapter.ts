import { EmailValidator } from '../presentation/helpers/email-validator'
import validator from 'validator'

export class EmailValidatorAdapter implements EmailValidator {
    isEmail(email: string): boolean {
        return validator.isEmail(email)
    }
}
