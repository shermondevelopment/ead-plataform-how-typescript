import {
    ValidationComposite,
    RequiredFieldValidation,
    EmailValidation
} from '../../../../validation/validators'
import { makeSigninValidation } from './signin-validators-factory'
import { Validation } from '../../../../presentation/protocols/validation'
import { EmailValidator } from '../../../../validation/protocols/email-validator'

jest.mock('../../../../validation/validators/validation-composite')

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
