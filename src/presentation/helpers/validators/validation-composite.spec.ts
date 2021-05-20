import { MissingParamError } from '../../erros'
import { Validation } from './validation'
import { ValidationComposite } from './validation-composite'

describe('Validation Composite', () => {
    test('Should return an error if any validation fails', () => {
        class ValidationStub implements Validation {
            validate(inpt: any): Error {
                return new MissingParamError('field')
            }
        }
        const validationStub = new ValidationStub()
        const sut = new ValidationComposite([validationStub])
        const error = sut.validate({ field: 'any_value' })
        expect(error).toEqual(new MissingParamError('field'))
    })
})
