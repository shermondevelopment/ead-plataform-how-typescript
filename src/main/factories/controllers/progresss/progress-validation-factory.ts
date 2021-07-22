import {
    RequiredFieldValidation,
    ValidationComposite
} from '../../../../validation/validators'
import { Validation } from '../../../../presentation/protocols/validation'

export const makeAddProgressValidation = (): ValidationComposite => {
    const validations: Validation[] = []
    for (const field of ['totalItems', 'completedItems', 'moduleId']) {
        validations.push(new RequiredFieldValidation(field))
    }
    return new ValidationComposite(validations)
}
