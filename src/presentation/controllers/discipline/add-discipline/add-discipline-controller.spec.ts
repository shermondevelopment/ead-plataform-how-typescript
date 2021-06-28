import { Validation } from '../../../protocols/validation'
import { AddDisciplineController } from './add-discipline-controller'

export interface SutTypes {
    sut: AddDisciplineController
    validationStub: Validation
}

const makeFakeRequest = () => ({
    body: {
        title: 'any_title'
    }
})

const makeValidation = (): Validation => {
    class ValidationStub implements Validation {
        validate(input: any): Error {
            return null
        }
    }
    return new ValidationStub()
}

const makeSut = (): SutTypes => {
    const validationStub = makeValidation()
    const sut = new AddDisciplineController(validationStub)
    return {
        sut,
        validationStub
    }
}

describe('Add Discipline Controller', () => {
    test('Should call Validation how correct values', async () => {
        const { sut, validationStub } = makeSut()
        const spyAddDiscipline = jest.spyOn(validationStub, 'validate')
        const httpRequest = makeFakeRequest()
        await sut.handle(makeFakeRequest())
        expect(spyAddDiscipline).toHaveBeenCalledWith(httpRequest.body)
    })
})
