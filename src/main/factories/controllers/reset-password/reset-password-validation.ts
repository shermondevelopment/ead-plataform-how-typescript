import {
    ValidationComposite,
    RequiredFieldValidation,
    CompareFieldsValidation
} from '../../../../validation/validators'
import { Validation } from '../../../../presentation/protocols/validation'

export const makeResetPasswordValidation = (): ValidationComposite => {
    const validations: Validation[] = []
    for (const field of ['token', 'password', 'confirmPassword']) {
        validations.push(new RequiredFieldValidation(field))
    }
    validations.push(new CompareFieldsValidation('password', 'confirmPassword'))
    return new ValidationComposite(validations)
}
