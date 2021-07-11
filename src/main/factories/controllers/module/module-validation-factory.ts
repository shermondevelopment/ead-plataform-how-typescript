import { Validation } from '../../../../presentation/protocols/validation'
import {
    RequiredFieldValidation,
    ValidationComposite
} from '../../../../validation/validators'

export const makeAddModuleValidation = (): ValidationComposite => {
    const validations: Validation[] = []
    for (const field of ['title', 'order', 'disciplineId']) {
        validations.push(new RequiredFieldValidation(field))
    }
    return new ValidationComposite(validations)
}
