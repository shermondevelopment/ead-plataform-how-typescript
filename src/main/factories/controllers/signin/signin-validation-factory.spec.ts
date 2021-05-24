import {
    ValidationComposite,
    RequiredFieldValidation,
    EmailValidation
} from '../../../../presentation/helpers/validators'
import { makeSigninValidation } from './signin-validators-factory'
import { Validation } from '../../../../presentation/protocols/validation'
import { EmailValidator } from '../../../../presentation/helpers/email-validator'

jest.mock('../../../../presentation/helpers/validators/validation-composite')

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
