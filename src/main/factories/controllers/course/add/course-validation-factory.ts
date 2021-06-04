import {
    RequiredFieldValidation,
    ValidationComposite
} from '../../../../../validation/validators'
import { Validation } from '../../../../../presentation/protocols/validation'

export const makeAddCourseValidation = (): ValidationComposite => {
    const validations: Validation[] = []
    for (const field of ['title', 'figure']) {
        validations.push(new RequiredFieldValidation(field))
    }
    return new ValidationComposite(validations)
}
