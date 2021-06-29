import {
    badRequest,
    ok,
    serverError,
    Validation,
    MissingParamError,
    AddDisciplineModel,
    AddDiscipline,
    DisciplineModel
} from './add-discipline-controller-protocols'
import { AddDisciplineController } from './add-discipline-controller'

export interface SutTypes {
    sut: AddDisciplineController
    validationStub: Validation
    addDisciplineStub: AddDiscipline
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

const makeAddDiscipline = (): AddDiscipline => {
    class AddDisciplineStub implements AddDiscipline {
        async add(params: AddDisciplineModel): Promise<DisciplineModel> {
            return new Promise((resolved) =>
                resolved({ title: 'any_title', slug: 'any_slug' })
            )
        }
    }
    return new AddDisciplineStub()
}

const makeSut = (): SutTypes => {
    const addDisciplineStub = makeAddDiscipline()
    const validationStub = makeValidation()
    const sut = new AddDisciplineController(validationStub, addDisciplineStub)
    return {
        sut,
        validationStub,
        addDisciplineStub
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
    test('should return 400 if Validation returns an error', async () => {
        const { sut, validationStub } = makeSut()
        jest.spyOn(validationStub, 'validate').mockReturnValueOnce(
            new MissingParamError('any_field')
        )
        const httpResponse = await sut.handle(makeFakeRequest())
        expect(httpResponse).toEqual(
            badRequest(new MissingParamError('any_field'))
        )
    })
    test('Should call AddDiscipline how correct values', async () => {
        const { sut, addDisciplineStub } = makeSut()
        const spyAddDiscipline = jest.spyOn(addDisciplineStub, 'add')
        await sut.handle(makeFakeRequest())
        expect(spyAddDiscipline).toHaveBeenCalledWith({ title: 'any_title' })
    })
    test('Should return 500 if AddDiscipline throws', async () => {
        const { sut, addDisciplineStub } = makeSut()
        jest.spyOn(addDisciplineStub, 'add').mockReturnValueOnce(
            new Promise((resolv, reject) => reject(new Error()))
        )
        const httpResponse = await sut.handle(makeFakeRequest())
        expect(httpResponse).toEqual(serverError(new Error()))
    })
    test('Should return 200 if AddDiscipline return success', async () => {
        const { sut } = makeSut()
        const httpResponse = await sut.handle(makeFakeRequest())
        expect(httpResponse).toEqual(
            ok({ title: 'any_title', slug: 'any_slug' })
        )
    })
})
