import { ValidationComposite } from '../../../../validation/validators'
import { Validation } from '../../../../presentation/protocols/validation'
import { NotRequiredFieldValidation } from '../../../../validation/validators/not-permission-params'

export const makeUpdateAccountValidation = (): ValidationComposite => {
    const validations: Validation[] = []
    for (const field of [
        'password',
        'role',
        'email',
        'view_free_time',
        'status',
        'payment',
        'id'
    ]) {
        validations.push(new NotRequiredFieldValidation(field))
    }
    return new ValidationComposite(validations)
}
