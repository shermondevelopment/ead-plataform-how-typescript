import {
    CompareFieldsValidation,
    RequiredFieldValidation,
    ValidationComposite
} from '../../../../validation/validators'
import { Validation } from '../../../../presentation/protocols/validation'

export const makeUpdatePasswodValidation = (): ValidationComposite => {
    const validations: Validation[] = []
    for (const field of ['password', 'confirmPassword']) {
        validations.push(new RequiredFieldValidation(field))
    }
    validations.push(new CompareFieldsValidation('password', 'confirmPassword'))
    return new ValidationComposite(validations)
}
