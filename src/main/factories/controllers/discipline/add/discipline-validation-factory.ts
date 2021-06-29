import {
    RequiredFieldValidation,
    ValidationComposite
} from '../../../../../validation/validators'
import { Validation } from '../../../../../presentation/protocols/validation'

export const makeAddDisciplineValidation = (): ValidationComposite => {
    const validations: Validation[] = []
    for (const field of ['title']) {
        validations.push(new RequiredFieldValidation(field))
    }
    return new ValidationComposite(validations)
}
