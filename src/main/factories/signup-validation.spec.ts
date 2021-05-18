import { ValidationComposite } from '../../presentation/helpers/validators/validation-composite'
import { RequiredFieldValidation } from '../../presentation/helpers/validators/required-field-validation'
import { makeSignUpValidation } from './signup-validators'
import { Validation } from '../../presentation/helpers/validators/validation'

jest.mock('../../presentation/helpers/validators/validation-composite')

describe('SignUpValidation Factory', () => {
    test('Should call ValidationComposite with all validatotions', () => {
        makeSignUpValidation()
        const validations: Validation[] = []
        for (const field of ['name', 'email', 'sexo', 'password']) {
            validations.push(new RequiredFieldValidation(field))
        }
        expect(ValidationComposite).toHaveBeenCalledWith(validations)
    })
})
