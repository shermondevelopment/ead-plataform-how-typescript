import {
    RequiredFieldValidation,
    ValidationComposite
} from '../../../../../validation/validators'
import { Validation } from '../../../../../presentation/protocols/validation'

export const makeAddClasseValidation = (): ValidationComposite => {
    const validations: Validation[] = []
    for (const field of ['title', 'url', 'order', 'moduleId']) {
        validations.push(new RequiredFieldValidation(field))
    }
    return new ValidationComposite(validations)
}
