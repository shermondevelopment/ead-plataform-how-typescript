import { ValidationComposite } from '../../../presentation/helpers/validators/validation-composite'
import { RequiredFieldValidation } from '../../../presentation/helpers/validators/required-field-validation'
import { makeSigninValidation } from './signin-validators'
import { Validation } from '../../../presentation/helpers/validators/validation'
import { EmailValidation } from '../../../presentation/helpers/validators/email-validation'
import { EmailValidator } from '../../../presentation/helpers/email-validator'

jest.mock('../../../presentation/helpers/validators/validation-composite')

const makeEmailValidatorStub = (): EmailValidator => {
    class EmailValidatorStub implements EmailValidator {
        isEmail(email: string): boolean {
            return true
        }
    }
    return new EmailValidatorStub()
}

describe('SignUpValidation Factory', () => {
    test('Should call ValidationComposite with all validatotions', () => {
        makeSigninValidation()
        const validations: Validation[] = []
        for (const field of ['email', 'password']) {
            validations.push(new RequiredFieldValidation(field))
        }
        validations.push(new EmailValidation('email', makeEmailValidatorStub()))
        expect(ValidationComposite).toHaveBeenCalledWith(validations)
    })
})
